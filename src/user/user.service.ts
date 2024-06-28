import { Injectable, BadRequestException } from '@nestjs/common';

import { UserDto } from './dtos/user.dto';
import { FirebaseAdmin } from '../../firebase.setup';
import { User } from './entities/user.entities';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {UserRolesEnum} from "../shared/enums/user-roles.enum";
@Injectable()
export class UserService {
  constructor(
    private readonly admin: FirebaseAdmin,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async createUser(userRequest: UserDto): Promise<User> {
    const { email, password, firstName, lastName, role } = userRequest;
    const userRole = role ? role : UserRolesEnum.USER;
    const app = this.admin.setup();

    const existingUser = await this.userRepo.findOne({ where: { email } } as FindOneOptions<User>);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { userRole });

      // Create a new user entity with hashed password
      const newUser = await this.userRepo.create({
        email,
        firstName,
        lastName,
        role: userRole,
      });

      // Save the new user to the database
      const savedUser = await this.userRepo.save(newUser);
      return savedUser; // Return the created user
    } catch (error) {
      console.error('Error creating user:', error); // Log the error for debugging
      throw new BadRequestException('Failed to create user'); // Generic error message for the client
    }
  }
}
