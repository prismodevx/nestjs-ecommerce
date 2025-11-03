import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from '@shared/hash/domain/hash.service';

@Injectable()
export class BcryptHashService implements HashService {
  private readonly SALT_ROUNDS = 10;

  async hash(plainText: string): Promise<string> {
    try {
      return await bcrypt.hash(plainText, this.SALT_ROUNDS);
    } catch (error) {
      throw new Error(`Error al hashear: ${error.message}`);
    }
  }

  async compare(plainText: string, hashedText: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainText, hashedText);
    } catch (error) {
      return false;
    }
  }
}
