import { IBaseRepository } from '@shared/database/domain/base.repository.interface';
import { User } from '@modules/user/domain/user.entity';

export interface UserRepository extends IBaseRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;

  create(user: User): Promise<void>;
}
