import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/modules/product/domain/product.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { Product } from '@/modules/product/domain/product.entity';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findByIdForUpdate(id: string, tx: any): Promise<Product | null> {
    const rows = await tx.$queryRaw`
      SELECT * FROM "Product"
      WHERE id = ${id}
        FOR UPDATE
    `;

    const row = rows[0];
    if (!row) return null;

    return new Product(row.id, row.name, Number(row.price), Number(row.stock));
  }

  async save(product: Product, tx: any): Promise<void> {
    await tx.product.update({
      where: { id: product.id },
      data: { stock: product.getStock() },
    });
  }
}
