import { IsArray, IsUUID, IsNumber, ArrayMinSize } from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  items: {
    productId: string;
    quantity: number;
  }[];
}
