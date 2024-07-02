import { Injectable, BadRequestException } from '@nestjs/common';

import { UserDto } from './dtos/user.dto';
import { FirebaseAdmin } from '../../firebase.setup';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRolesEnum } from '../shared/enums/user-roles.enum';
@Injectable()
export class UserService {
  constructor(
    private readonly firebaseAdmin: FirebaseAdmin,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userRequest: UserDto): Promise<User> {
    const { email, password, firstName, lastName, role } = userRequest;
    const userRole = role || UserRolesEnum.USER;

    // Get Firebase Admin SDK instance
    const app = this.firebaseAdmin.getApp();

    try {
      // Create user in Firebase Authentication
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });

      // Set custom claims
      await app.auth().setCustomUserClaims(createdUser.uid, { role: userRole });

      // Create user entity
      const newUser = this.userRepository.create({
        email,
        firstName,
        lastName,
        role: userRole,
      });

      // Save user to database
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new BadRequestException('Failed to create user');
    }
  }
}
