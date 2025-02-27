import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel : SoftDeleteModel<UserDocument>){}
   hashPassWord = (password : string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt)
    return hash
  }
  async create(createUserDto : CreateUserDto){
    const hashPassWord = await this.hashPassWord(createUserDto.password)
    let user = await this.userModel.create({...createUserDto, password : hashPassWord})
    return {
      statusCode : 201,
      message : "Create a new User",
      data : {
        _id : createUserDto.company._id,
        cretedAt : user.createdAt
      }
    }
  }
  async register(createUserDto : CreateUserDto){
    const hashPassWord = await this.hashPassWord(createUserDto.password)
    let user = await this.userModel.create({...createUserDto, password : hashPassWord, role : "USER"})
    return {
      statusCode : 201,
      message : "Register a new user",
      data : {
        _id : user._id,
        createdAt : user.createdAt
      }
    }
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return 'not found user'
    return this.userModel.findOne({
      _id : id
    })
  
  }
  findOneByUserName(username : string) {
   return this.userModel.findOne({
    email : username
   })
  
  }
  isValidPassWord(password : string, hash : string){
    return compareSync(password, hash)
  }
  async update( updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({_id : updateUserDto._id}, {...updateUserDto})
  }

  remove(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id)) return 'not found user'
    return this.userModel.softDelete({
      _id : id
    })
  }
}
