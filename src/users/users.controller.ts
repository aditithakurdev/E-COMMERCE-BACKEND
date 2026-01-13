import { Controller, Get, Put, Delete, Body, Param, Headers, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get user profile by userId from request headers
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Headers('user-id') userId: string) {
    return this.usersService.getProfile(userId);
  }

  // Update user profile
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProfile(@Headers('user-id') userId: string, @Body() updateData: Partial<User>) {
    return this.usersService.updateProfile(userId, updateData);
  }

  // Delete user (self or admin)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Headers('user-id') requesterId: string,
    @Headers('role') role: string,
    @Param('id') userId: string,
  ) {
    const isAdmin = role === 'ADMIN';
    return this.usersService.deleteUser(userId, requesterId, isAdmin);
  }
}

