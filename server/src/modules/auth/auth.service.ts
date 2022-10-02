import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { LoginRequestDto, LoginResponseDto } from './dto';
import { IAuthService } from './interfaces';

@Injectable()
export class AuthService implements IAuthService {
  login(loginRequestDto: LoginRequestDto): LoginResponseDto {
    const bearer_token: string = sign(
      {
        user: loginRequestDto.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600,
      },
    );

    return { bearer_token };
  }
}
