import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/modules/product/domain/product.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { Product } from '@/modules/product/domain/product.entity';
import { TransactionalRepository } from '@shared/database/prisma/unit-of-work.service';
import { BaseRepository } from '@shared/database/prisma/base.repository';
import { Prisma } from '@/generated/client/client';

@Injectable()
@TransactionalRepository()
export class PrismaProductRepository
  extends BaseRepository
  implements ProductRepository
{
  constructor(defaultPrisma: PrismaService) {
    super(defaultPrisma);
  }

  async findByIdForUpdate(id: string): Promise<Product | null> {
    const rows = await this.prisma.$queryRaw<
      {
        id: string;
        name: string;
        price: number;
        stock: number;
      }[]
    >`
      SELECT * FROM "Product"
      WHERE id = ${id}
        FOR UPDATE
    `;

    const row = rows[0];
    if (!row) return null;

    return new Product(row.id, row.name, Number(row.price), Number(row.stock));
  }

  async findManyByIdForUpdate(ids: string[]): Promise<Product[]> {
    const products = await this.prisma.$queryRaw<
      {
        id: string;
        name: string;
        price: number;
        stock: number;
      }[]
    >(Prisma.sql`
      SELECT *
      FROM "Product"
      WHERE id = ANY(${ids})
      FOR UPDATE
    `);

    return products.map((p) => new Product(p.id, p.name, p.price, p.stock));
  }

  async save(product: Product): Promise<void> {
    await this.prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        stock: product.getStock(),
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.getStock(),
        createdBy: '',
      },
    });
  }

  async saveMany(products: Product[]): Promise<void> {
    for (const p of products) {
      await this.prisma.product.update({
        where: { id: p.id },
        data: {
          stock: p.getStock(),
        },
      });
    }
  }
}
