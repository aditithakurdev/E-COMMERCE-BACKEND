import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { Product } from '../products/product.entity';
import { ResponseMessage } from 'src/common/responseMessage';
import { CreateOrderDto } from './dto/order.dto';
import { StatusCode } from 'src/common/enums/status-code.enum';
import { ErrorMessage } from 'src/common/error-message.enum';
import { OrderStatus } from 'src/common/enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  // Create order (User only)
  async createOrder(userId: string, dto: CreateOrderDto) {
    let totalAmount = 0;
    const items: OrderItem[] = [];

    for (const i of dto.items) {
      const product = await this.productRepo.findOne({ where: { id: i.productId, isActive: true } });
      if (!product) throw new NotFoundException(ErrorMessage.PRODUCT_NOT_FOUND);

      totalAmount += product.price * i.quantity;

      const orderItem = this.orderItemRepo.create({
        productId: product.id,
        quantity: i.quantity,
        price: product.price,
      });
      items.push(orderItem);
    }

    const order = this.orderRepo.create({
      userId,
      totalAmount,
      items,
    });

    await this.orderRepo.save(order);

    return {
      statusCode: StatusCode.CREATED,
      message: ResponseMessage.ORDER.CREATE_SUCCESS,
      data: order,
    };
  }

  // Get all orders (Admin) or own orders (User)
  async getOrders(requesterId: string, isAdmin: boolean) {
    const orders = isAdmin
      ? await this.orderRepo.find({ relations: ['items'] })
      : await this.orderRepo.find({ where: { userId: requesterId }, relations: ['items'] });

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.ORDER.FETCH_ALL_SUCCESS,
      data: orders,
    };
  }

  // Get single order
  async getOrderById(orderId: string, requesterId: string, isAdmin: boolean) {
    const order = await this.orderRepo.findOne({ where: { id: orderId }, relations: ['items'] });
    if (!order) throw new NotFoundException(ResponseMessage.ORDER.NOT_FOUND);

    if (!isAdmin && order.userId !== requesterId) throw new ForbiddenException(ResponseMessage.ORDER.UNAUTHORIZED);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.ORDER.FETCH_ONE_SUCCESS,
      data: order,
    };
  }

  async updateOrderStatus(orderId: string, status: OrderStatus, isAdmin: boolean) {
  if (!isAdmin) throw new ForbiddenException(ErrorMessage.ORDER_UNAUTHORIZED);

  const order = await this.orderRepo.findOne({ where: { id: orderId } });
  if (!order) throw new NotFoundException(ErrorMessage.ORDER_NOT_FOUND);

  order.status = status;
  await this.orderRepo.save(order);

  return {
    statusCode: StatusCode.OK,
    message: `Order status updated to ${status}`,
    data: order,
  };
}

}
