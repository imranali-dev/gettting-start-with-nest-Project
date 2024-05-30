// jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authorizationHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // Attach user information to the request
      return true;
    } catch (err) {
      return false;
    }
  }
}
