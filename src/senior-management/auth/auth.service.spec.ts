import { Test } from "@nestjs/testing"
import exp from "constants";
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service";

it("测试auth.sign",async ()=>{
    // const fakeUserService = {
    //     find:(account:string)=>Promise.resolve([]),
    //     createUser:(account:string,password:string)=>Promise.resolve({})
    // } as UsersService;
    // const module = await Test.createTestingModule({
    //     providers:[
    //         AuthService,
    //         {
    //             provide:UsersService,useValue:fakeUserService
    //         }
    //     ],
    // }).compile();
    // const service = module.get(AuthService);
    // expect(service).toBeDefined();

    // const user = await service.signup('125@qq.com','123456');
    // console.log(user);

    // expect(user).toBeDefined();

})