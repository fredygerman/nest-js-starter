import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserQueryService } from './user.query.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [UserQueryService, UserRepository],
  exports: [UserQueryService],
  controllers: [UserController],
})
export class UserModule {}