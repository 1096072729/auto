import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { handleRetry } from "@nestjs/typeorm";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor{

    constructor(private usersService:UsersService){}

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session;

        if(userId){
            const user  = await this.usersService.findOne(userId);
            request.CurrentUser = user;
        }
        return handler.handle();
    }
    
}