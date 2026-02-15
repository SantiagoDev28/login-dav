export class Password {
  private constructor(private readonly value: string) {}

  static fromPlain(value: string): Password {
    if (value.length < 6) {
      throw new Error('Password too short');
    }
    return new Password(value);
  }

  static fromHashed(value: string): Password {
    return new Password(value);
  }

  getValue(): string {
    return this.value;
  }
}
