import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: '24h',
    });
  }

  generateRefreshToken(payload: any) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }
}
