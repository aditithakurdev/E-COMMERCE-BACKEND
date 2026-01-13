import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { StatusCode } from 'src/common/enums/status-code.enum';
import { ResponseMessage } from 'src/common/responseMessage';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  // Get logged-in user profile
  async getProfile(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(ResponseMessage.USER.USER_NOT_FOUND);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.USER.PROFILE_FETCHED,
      data: user,
    };
  }

  // Update user profile (name, email, etc.)
  async updateProfile(userId: string, updateData: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(ResponseMessage.USER.USER_NOT_FOUND);

    Object.assign(user, updateData);
    await this.userRepo.save(user);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.USER.UPDATE_SUCCESS,
      data: user,
    };
  }

  // Delete user (admin or self)
  async deleteUser(userId: string, requesterId: string, isAdmin: boolean) {
    if (!isAdmin && userId !== requesterId) {
      throw new UnauthorizedException(ResponseMessage.AUTH.UNAUTHORIZED);
    }

    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(ResponseMessage.USER.USER_NOT_FOUND);

    await this.userRepo.remove(user);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.USER.DELETE_SUCCESS,
    };
  }
}
