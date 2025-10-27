import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { IUnitOfWork } from '@shared/database/domain/unit-of-work.interface';
import { IBaseRepository } from '@shared/database/domain/base.repository.interface';
import { PrismaService } from '@shared/database/prisma/prisma.service';

export const TRANSACTIONAL_REPOSITORY = 'TRANSACTIONAL_REPOSITORY';
export const TransactionalRepository = () =>
  Reflect.metadata(TRANSACTIONAL_REPOSITORY, true);

@Injectable()
export class UnitOfWorkService implements IUnitOfWork, OnModuleInit {
  private repositories: IBaseRepository[] = [];

  constructor(
    private readonly prisma: PrismaService,
    private readonly discovery: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    const providers = this.discovery.getProviders();

    this.repositories = providers
      .filter((wrapper: InstanceWrapper) => {
        const instance: unknown = wrapper.instance;

        if (!instance || typeof instance !== 'object') {
          return false;
        }

        const hasSetTransactionClient =
          'setTransactionClient' in instance &&
          typeof instance.setTransactionClient === 'function';

        const hasDecorator = Boolean(
          this.reflector.get(TRANSACTIONAL_REPOSITORY, instance.constructor),
        );

        return hasDecorator || hasSetTransactionClient;
      })
      .map((wrapper: InstanceWrapper) => wrapper.instance as IBaseRepository);
  }

  async execute<T>(work: (tx: object) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (prismaTransaction) => {
      this.repositories.forEach((repo) => {
        repo.setTransactionClient(prismaTransaction);
      });

      return await work(prismaTransaction);
    });
  }
}
