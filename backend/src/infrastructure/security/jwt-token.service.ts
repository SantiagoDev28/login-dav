import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenService, TokenPayload } from '../../domain/ports';

@Injectable()
export class JwtTokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync({ sub: payload });
  }
}