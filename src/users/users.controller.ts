import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user?: { sub: string };
}
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get logged-in user profile
   * Protected Route
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: AuthenticatedRequest) {
    const userId = req.user?.sub;

    if (!userId) {
      throw new Error('User ID is not available');
    }

    const user = await this.usersService.findById(userId);

    // Remove password before sending response
    const { password, ...safeUser } = user;

    return safeUser;
  }

  /**
   * Get all users (Admin use-case – optional)
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers() {
    const users = await this.usersService.findAll();

    return users.map(({ password, ...rest }) => rest);
  }
}
