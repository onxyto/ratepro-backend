import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseAdmin } from '../../../firebase.setup'; // Assuming FirebaseAdmin is defined elsewhere

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseAdmin: FirebaseAdmin) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const app = this.firebaseAdmin.getApp();
    const request = context.switchToHttp().getRequest();

    // Skip authentication for signup endpoint
    if (request.url.includes('/signup')) {
      return true; // Allow signup without token check
    }

    const idToken = request.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
      throw new UnauthorizedException('Authorization token not found');
    }

    try {
      const claims = await app.auth().verifyIdToken(idToken);
      console.log('User claims:', claims); // Example of using 'claims' for debugging
      // Implement your permission logic here using 'claims' if needed

      return true; // Return true if the token is valid (and permission check passes, if applicable)
    } catch (error) {
      console.error('Error verifying Firebase token:', error);
      throw new UnauthorizedException('Invalid authorization token');
    }
  }
}
