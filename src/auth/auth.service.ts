import { Injectable, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CustomJwtService } from './jwt.service';
import { StatusCode } from 'src/common/enums/status-code.enum';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ResponseMessage } from 'src/common/responseMessage';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: CustomJwtService,
  ) {}

  // Register user
  async register(dto: RegisterDto) {
    const userExists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (userExists) throw new ConflictException(ResponseMessage.COMMON.EMAIL_ALREADY_EXISTS);

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({ ...dto, password: hashedPassword });
    await this.userRepo.save(user);

    return {
      statusCode: StatusCode.CREATED,
      message: ResponseMessage.AUTH.REGISTER_SUCCESS,
    };
  }

  // Login user
  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException(ResponseMessage.AUTH.LOGIN_FAILED);

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException(ResponseMessage.AUTH.LOGIN_FAILED);

    const payload = { sub: user.id, email: user.email, role: user.role };

    // Save refresh token in DB
    const refreshToken = this.jwtService.generateRefreshToken(payload);
    user.refreshToken = refreshToken;
    await this.userRepo.save(user);

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.AUTH.LOGIN_SUCCESS,
      data: {
        accessToken: this.jwtService.generateAccessToken(payload),
        refreshToken,
      },
    };
  }

  // Refresh token
  async refreshToken(userId: string, token: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user || user.refreshToken !== token) throw new UnauthorizedException(ResponseMessage.AUTH.REFRESH_FAILED);

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      statusCode: StatusCode.OK,
      message: ResponseMessage.AUTH.REFRESH_SUCCESS,
      data: {
        accessToken: this.jwtService.generateAccessToken(payload),
      },
    };
  }
}
