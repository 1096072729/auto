import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from '../users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private userService: UsersService,
    ) {}
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    // const parent = context.getClass();
    const handler = context.getHandler();
    const needRoles = this.reflector.get<string[]>('access-roles', handler);
    if(!needRoles) {return true}

    const {userId} = request.session;
    // const userId = request.session.userId;
    if(userId) {
      const user = await this.userService.findOne(userId);
      if(user.roles.indexOf("-")){
        return true;
      }else{
        if(needRoles.includes(user.roles)) {
          return true;
        }
      }
    } else {
      return false;
    }
    return false;
  }
}

