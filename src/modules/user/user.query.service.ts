// Objective: Implement the user query service to handle the user queries
// External dependencies
import { Injectable } from '@nestjs/common';

// Internal dependencies
import { UserRepository } from './user.repository';

// Other modules dependencies

// Shared dependencies
import { InternalServerErrorException } from '../../core/exceptions/internal-server-error.exception';

@Injectable()
export class UserQueryService {
  constructor(private readonly userRepository: UserRepository) {}

  // findByEmail is a method that finds a user by their email address
  async findByEmail(email: string): Promise<any> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  // findById is a method that finds a user by their unique identifier
  async findById(id: string): Promise<any> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }

  // create is a method that creates a new user
  async create(user: any): Promise<any> {
    try {
      return await this.userRepository.create(user);
    } catch (error) {
      throw InternalServerErrorException.INTERNAL_SERVER_ERROR(error);
    }
  }
}
