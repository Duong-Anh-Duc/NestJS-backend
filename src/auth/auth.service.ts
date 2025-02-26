import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/user.interface';

import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(private userService : UsersService,
        private jwt : JwtService
    ){}
    async validateUser(username : string, password : string) : Promise<any>{
        
        const user = await this.userService.findOneByUserName(username)
        if(user){
            const isValid = this.userService.isValidPassWord(password, user.password)
            if(isValid){
                return user;
            }
        }
       
    return null;
    }
    async login(user : IUser){
        const {_id , name, email, role} = user
        const payload = {
            sub : "token login",
            iss : "from server",
            _id,
            name,
            email,
            role
        }
        return {
            access_token : this.jwt.sign(payload),
            _id,
            name,
            email,
            role
        }
    }
}
   
