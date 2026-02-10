export class User {
  constructor(
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
  ) {}

  // Método de dominio: validar si el email tiene formato correcto
  isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  // Método de dominio: validar longitud de password
  isPasswordValid(): boolean {
    return this.password.length >= 6;
  }
}
