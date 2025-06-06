import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import ms from 'ms';
import { RolesService } from 'src/roles/roles.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class AuthService {
    constructor(private usersService : UsersService,
        private jwt : JwtService,
        private configService : ConfigService,
        private rolesService : RolesService
    ){}
    async validateUser(username : string, password : string) : Promise<any>{
        
        const user = await this.usersService.findOneByUserName(username).select('+password')
        if(user){
            const isValid = await this.usersService.isValidPassWord(password, user.password)
            if(isValid){
               const userRole = user.role as unknown as {_id : string, name : string}
               const temp = await this.rolesService.findOne(userRole._id)
               const objUser = {
                ...user.toObject(),
                permissions : temp?.permissions ?? []
               }

               return objUser
            }
        }
       
    return null;
    }
    async login(user : IUser, response : Response){
        const {_id , name, email, role, permissions} = user
        const payload = {
            sub : "token refresh",
            iss : "from server",
            _id,
            name,
            email,
            role
        }
        const refresh_token = this.createRefreshToken({name : "anh duc"})
        // update user with refresh token
        await this.usersService.updateUserToken(refresh_token, _id)
        // set refresh_token as cookies
        const userRole = user.role as unknown as {_id : string, name : string}
        const temp = await this.rolesService.findOne(userRole._id)
        response.cookie('refresh_token', refresh_token, {
            httpOnly : true,
            maxAge : ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) 
        })
        return {
            access_token : this.jwt.sign(payload),
            refresh_token,
            user : {
            _id,
            name,
            email,
            role,
            permissions: temp?.permissions ?? []
            }
        }
    }
    async register(registeUserDto: RegisterUserDto){
      let newUser =  await this.usersService.register(registeUserDto)
      return {
        _id : newUser?._id,
        createdAt : newUser?.createdAt
      }
    }
    createRefreshToken = (payload) => {
        const refresh_token = this.jwt.sign(payload, {
            secret : this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn : ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) / 1000
        })
      return refresh_token
    }
    processNewToken = async (refreshToken : string, response : Response) => {
        try{
            this.jwt.verify(refreshToken, {
                secret : this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
            })
            let user = await this.usersService.findUserByToken(refreshToken)
            if(user){
                const {_id , name, email, role} = user
            const payload = {
                sub : "token refresh",
                iss : "from server",
                _id,
                name,
                email,
                role
            }

            const refresh_token = this.createRefreshToken({name : "anh duc"})
            // update user with refresh token
            await this.usersService.updateUserToken(refresh_token, _id.toString())
            // clear cookies
            response.clearCookie("refresh_token")
            // set refresh_token as cookies
            response.cookie('refresh_token', refresh_token, {
                httpOnly : true,
                maxAge : ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')) 
            })
        return {
            access_token : this.jwt.sign(payload),
            refresh_token,
            user : {
            _id,
            name,
            email,
            role
            }
        }
            }
            else{

            }

        } catch(error){
            throw new BadRequestException(`Refresh token không hợp lệ. Vui lòng login`)
        }
    }
    async logout(user : IUser, response : Response){
        await this.usersService.updateUserToken("", user._id)
        response.clearCookie("refresh_token")
        return "ok"
    }
}
   
