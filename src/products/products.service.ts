import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
  ) {}

  create(data: any) {
    return this.repo.save(data);
  }

  findAll() {
    return this.repo.find();
  }
}
