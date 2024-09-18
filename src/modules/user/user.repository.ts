import { Inject, Injectable } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DRIZZLE_ORM } from '../../core/constants/db.constants';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js/index';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserRepository {
  constructor(@Inject(DRIZZLE_ORM) private db: PostgresJsDatabase<typeof schema>) {}

  async findById(id: string) {
    return await this.db
      .select()
      .from(schema.User)
      .where(eq(schema.User.id, id))
      .limit(1)
      .then(rows => rows[0] || null);
  }

  async findOne(filter: any) {
    const [key, value] = Object.entries(filter)[0];
    return await this.db
      .select()
      .from(schema.User)
      .where(eq(schema.User[key], value))
      .limit(1)
      .then(rows => rows[0] || null);
  }

  async create(user: any) {
    return await this.db
      .insert(schema.User)
      .values(user)
      .returning()
      .then(rows => rows[0]);
  }

}