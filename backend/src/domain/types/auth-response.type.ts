export type AuthResponse = {
  accessToken: string;
  user: {
    email: string;
    name: string;
  };
};