export class UserStatus {
  private constructor(private readonly value: 'ACTIVE' | 'INACTIVE') {}

  static active(): UserStatus {
    return new UserStatus('ACTIVE');
  }

  static inactive(): UserStatus {
    return new UserStatus('INACTIVE');
  }

  isActive(): boolean {
    return this.value === 'ACTIVE';
  }

  getValue(): string {
    return this.value;
  }
}
