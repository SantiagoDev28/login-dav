export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Email {
    // Validacion para el formato que se recibe como email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      throw new Error('Invalid email format');
    }

    return new Email(value);
  }

  // Metodo que devuelve el valor.
  getValue(): string {
    return this.value;
  }

  // Metodo para comparar el valor interno del objeto. 
  equals(other: Email): boolean {
    return this.value === other.value;
  }
}
