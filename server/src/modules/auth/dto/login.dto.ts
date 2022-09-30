import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../enum/user.role';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Invalid role' })
  role: UserRole;
}

export class LoginResponseDto {
  bearer_token: string;
}
