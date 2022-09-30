import { LoginRequestDto, LoginResponseDto } from '../dto';

export interface IAuthService {
  /**
   * Returns a JSON web token (JWT) token which is going to be used for making
   * authenticated requests to protected endpoints
   * @param {LoginRequestDto} request The staff member's username and it's role
   * @returns {LoginResponseDto} The JWT token
   */
  login(request: LoginRequestDto): LoginResponseDto;
}
