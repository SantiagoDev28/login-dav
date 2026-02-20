export type AuthResponse = {
  accessToken: string | null ;
  user: {
    email: string;
    name: string;
  };
};