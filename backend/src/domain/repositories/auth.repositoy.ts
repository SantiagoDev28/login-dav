export interface IAuthRepository{
  generateToken(token: string): Promise<string>;
}