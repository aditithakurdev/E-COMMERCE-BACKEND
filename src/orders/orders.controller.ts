import { Controller, Post, Get, Param, Body, Headers, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Headers('user-id') userId: string, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getOrders(@Headers('user-id') userId: string, @Headers('role') role: string) {
    const isAdmin = role === 'ADMIN';
    return this.ordersService.getOrders(userId, isAdmin);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string, @Headers('user-id') userId: string, @Headers('role') role: string) {
    const isAdmin = role === 'ADMIN';
    return this.ordersService.getOrderById(id, userId, isAdmin);
  }

  
}
