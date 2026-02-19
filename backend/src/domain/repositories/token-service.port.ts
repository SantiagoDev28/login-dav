export interface ITokenService{
  generateToken(payload: string): Promise<string>;
}