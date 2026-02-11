export type AuthResponse = {
  success: boolean;
  message: string;
  user: {
    email: string;
    name: string;
  };
};