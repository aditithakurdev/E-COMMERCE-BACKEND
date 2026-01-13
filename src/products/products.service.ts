import { Injectable, NotFoundException, ForbiddenException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/common/responseMessage';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { StatusCode } from 'src/common/enums/status-code.enum';
import { ErrorMessage } from 'src/common/error-message.enum';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // Create Product (Admin only)
  async createProduct(dto: CreateProductDto, isAdmin: boolean) {
    if (!isAdmin) throw new ForbiddenException(ResponseMessage.AUTH.UNAUTHORIZED);

    const product = this.productRepo.create(dto);
    await this.productRepo.save(product);

    return {
      statusCode: StatusCode.CREATED,
      message: ResponseMessage.PRODUCT.CREATE_SUCCESS,
      data: product,
    };
  }

  // Get all products (Users + Admin)
  async getAllProducts() {
    const products = await this.productRepo.find({ where: { isActive: true } });
    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.PRODUCT.FETCH_ALL_SUCCESS,
      data: products,
    };
  }

  // Get single product by id
  async getProductById(id: string) {
    const product = await this.productRepo.findOne({ where: { id, isActive: true } });
    if (!product) throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.PRODUCT.FETCH_ONE_SUCCESS,
      data: product,
    };
  }

  // Update Product (Admin only)
  async updateProduct(id: string, dto: UpdateProductDto, isAdmin: boolean) {
    if (!isAdmin) throw new ForbiddenException(ResponseMessage.AUTH.UNAUTHORIZED);

    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);

    Object.assign(product, dto);
    await this.productRepo.save(product);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.PRODUCT.UPDATE_SUCCESS,
      data: product,
    };
  }

  // Delete Product (Admin only)
  async deleteProduct(id: string, isAdmin: boolean) {
  if (!isAdmin) throw new ForbiddenException(ErrorMessage.PRODUCT_UNAUTHORIZED);

  const product = await this.productRepo.findOne({ where: { id } });
  if (!product) throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);

  product.isActive = false; // soft delete
  await this.productRepo.save(product);

  return {
    statusCode: StatusCode.OK,
    message: ResponseMessage.PRODUCT.DELETE_SUCCESS,
  };
}

}
