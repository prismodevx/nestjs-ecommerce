import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductUseCase } from '@modules/product/application/command/create-product/create-product.use-case';
import { ProductBasicResponseDto } from '@modules/product/presentation/dto/product-basic.response.dto';
import { CreateProductDto } from '@modules/product/presentation/dto/create-product.dto';
import { CreateProductCommand } from '@modules/product/application/command/create-product/create-product.command';
import { ProductHttpMapper } from '@modules/product/presentation/product=http.mapper';
import { GetProductsUseCase } from '@modules/product/application/query/get-products/get-products.use-case';
import { ProductListResponseDto } from '@modules/product/presentation/dto/product-list.response.dto';
import { Product } from '@modules/product/domain/product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly getProducts: GetProductsUseCase,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateProductDto,
  ): Promise<ProductBasicResponseDto> {
    const command = new CreateProductCommand(dto.name, dto.stock, dto.price);
    const result = await this.createProduct.execute(command);

    return ProductHttpMapper.toBasicResponse(result);
  }

  @Get()
  async getAll(): Promise<ProductListResponseDto[]> {
    const result = await this.getProducts.execute();

    return result.map((product) => ProductHttpMapper.toListResponse(product));
  }
}
