import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsOptional()
  stock?: number;

  @IsOptional()
  category?: string;
}

export class UpdateProductDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsOptional()
  category?: string;

  @IsOptional()
  isActive?: boolean;
}
