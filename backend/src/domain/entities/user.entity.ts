import { Email, Password, UserStatus } from "../value-objects";


// Entidad de usuario que se crea a partir de Value-Objects con sus respectivas validaciones.
export class User {
  constructor(
    public readonly email: Email,
    public readonly name: string,
    public readonly password: Password,
    public readonly status: UserStatus,
  ) {}


  isActive(): boolean {
    return this.status.isActive()
  }
}
