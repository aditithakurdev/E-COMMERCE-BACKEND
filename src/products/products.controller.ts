import { Controller, Post, Get, Put, Delete, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create product (Admin)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateProductDto, @Headers('role') role: string) {
    const isAdmin = role === 'ADMIN';
    return this.productsService.createProduct(dto, isAdmin);
  }

  // Get all products
  @Get()
  async getAll() {
    return this.productsService.getAllProducts();
  }

  // Get product by id
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productsService.getProductById(id);
  }

  // Update product (Admin)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto, @Headers('role') role: string) {
    const isAdmin = role === 'ADMIN';
    return this.productsService.updateProduct(id, dto, isAdmin);
  }

  // Delete product (Admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Headers('role') role: string) {
    const isAdmin = role === 'ADMIN';
    return this.productsService.deleteProduct(id, isAdmin);
  }
}
