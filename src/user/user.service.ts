import { Injectable, BadRequestException } from '@nestjs/common';

import { UserDto } from './dtos/user.dto';
import { FirebaseAdmin } from '../../firebase.setup';
import { User } from './entities/user.entities';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRolesEnum } from 'src/shared/enums/user-roles.enum';
import { FavoriteProduct } from './entities/favorite-product.entities';
import { Reflector } from '@nestjs/core';

@Injectable()
export class UserService {
  constructor(
    private readonly reflector: Reflector,
    private readonly admin: FirebaseAdmin,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(FavoriteProduct)
    private readonly favoriteProductRepository: Repository<FavoriteProduct>,
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

  // async getCurrentUser(@ExecutionContext context: ExecutionContext): Promise<User | undefined> {
  //   try {
  //     const request = context.switchToHttp().getRequest();
  //     const authHeader = request.headers.authorization;

  //     const app = this.admin.setup();

  //     if (!authHeader?.startsWith('Bearer ')) {
  //       return null; // No authorization header or invalid format
  //     }

  //     const token = authHeader.split(' ')[1];
  //     const decodedToken = await app.auth().verifyIdToken(token);
  //     const userId = decodedToken.uid;

  //     // Retrieve user from context (assuming you have a custom guard or interceptor that sets the user)
  //     const user = this.reflector.get<User>('user', context);

  //     if (user && user.id === userId) {
  //       return user; // User object already available in context
  //     } else {
  //       // User object not found in context or ID mismatch, fetch from database
  //       const fetchedUser = await /* Your logic to find user by userId */;
  //       return fetchedUser;
  //     }
  //   } catch (error) {
  //     console.error('Error retrieving current user:', error);
  //     return null;
  //   }
  // }

  //   async addToFavorites(productId: string): Promise<void> {

  // const id = 1;
  //     const user = await this.userRepo.findOne({ where: { id } });

  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }

  //     // Check if product already exists in favorites (optional optimization)
  //     const existingFavorite = await this.favoriteProductRepository.findOne({
  //       where: { user, product: { id: productId } },
  //     });

  //     if (existingFavorite) {
  //       throw new NotFoundException('Product already in favorites');
  //     }

  //     const favoriteProduct = new FavoriteProduct();
  //     favoriteProduct.user = user;
  //     favoriteProduct.product = { id: productId }; // Assuming the product relation is established with just the ID

  //     await this.favoriteProductRepository.save(favoriteProduct);
  //   }
}
