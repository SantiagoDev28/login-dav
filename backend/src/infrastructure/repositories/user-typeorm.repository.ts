import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../../domain/repositories';
import { User as DomainUser } from '../../domain/entities';
import { Email, Password, UserStatus } from '../../domain/value-objects';
import { UserEntity } from '../database/typeorm/user.entity';

@Injectable()
export class UserTypeOrmRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: Email): Promise<DomainUser | null> {
    const record = await this.repo.findOne({ where: { email: email.getValue() } });
    if (!record) return null;
    const status = record.status === 'INACTIVE' ? UserStatus.inactive() : UserStatus.active();
    return new DomainUser(
      Email.create(record.email),
      record.name,
      Password.fromHashed(record.password),
      status,
    );
  }

  async create(user: DomainUser): Promise<DomainUser> {
    const entity = this.repo.create({
      email: user.email.getValue(),
      name: user.name,
      password: user.password.getValue(),
      status: user.status.getValue(),
    });
    const saved = await this.repo.save(entity);
    const savedStatus = saved.status === 'INACTIVE' ? UserStatus.inactive() : UserStatus.active();
    return new DomainUser(
      Email.create(saved.email),
      saved.name,
      Password.fromHashed(saved.password),
      savedStatus,
    );
  }

  async findAll(): Promise<DomainUser[]> {
    const records = await this.repo.find();
    return records.map((r) =>
      new DomainUser(
        Email.create(r.email),
        r.name,
        Password.fromHashed(r.password),
        r.status === 'INACTIVE' ? UserStatus.inactive() : UserStatus.active(),
      ),
    );
  }
}
