export interface TokenPayload{
  email: string;
  name: string;
}

export interface ITokenService{
  generateToken(payload: TokenPayload): Promise<string>;
}