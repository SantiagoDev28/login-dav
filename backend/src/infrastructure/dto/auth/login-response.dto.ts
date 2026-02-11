export class LoginResponseDto {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
}