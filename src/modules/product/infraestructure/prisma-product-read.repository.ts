import { Injectable } from '@nestjs/common';
import { BaseReadRepository } from '@shared/database/prisma/read.repository';
import { ProductReadRepository } from '@modules/product/application/repository/product-read.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { ProductListReadModel } from '@modules/product/application/query/get-products/product-list.read-model';

@Injectable()
export class PrismaProductReadRepository
  extends BaseReadRepository
  implements ProductReadRepository
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findAll(): Promise<ProductListReadModel[]> {
    const data = await this.prisma.product.findMany();

    return data.map((p) => ({
      id: p.id,
      name: p.name,
    }));
  }
}
