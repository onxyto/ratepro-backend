import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { FirebaseAdmin } from '../../../firebase.setup';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const app = this.firebaseAdmin.getApp();
    const request = context.switchToHttp().getRequest();

    // Skip token verification for signup endpoint
    if (request.url.includes('/signup')) {
      return next.handle();
    }

    const idToken = request.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
      throw new BadRequestException('Authorization token not found');
    }

    try {
      const claims = await app.auth().verifyIdToken(idToken);
      const user = await app.auth().getUser(claims.uid);
      request.currentUser = user; // Attach user to the request for downstream handlers/controllers
    } catch (error) {
      console.error('Error verifying Firebase token:', error);
      throw new BadRequestException('Invalid authorization token');
    }

    return next.handle();
  }
}
