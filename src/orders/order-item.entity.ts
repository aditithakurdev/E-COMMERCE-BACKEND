import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @Column()
  productId: string;

  @ManyToOne(() => Product)
  product: Product;

  @Column('int')
  quantity: number;

  @Column('float')
  price: number;
}
