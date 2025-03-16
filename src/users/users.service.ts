import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { IUser } from './user.interface';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel : SoftDeleteModel<UserDocument>){}
   hashPassWord = (password : string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt)
    return hash
  }
  async create(createUserDto : CreateUserDto, User : IUser){
    const hashPassWord = await this.hashPassWord(createUserDto.password)
    const isExist = await this.userModel.findOne({email : createUserDto.email})
    if(isExist){
      throw new BadRequestException(`Email : ${createUserDto.email} đã tồn tại trên hệ thống!`);
    }
    let user = await this.userModel.create({...createUserDto, password : hashPassWord})
    return user;
  }
  async update( updateUserDto: UpdateUserDto, User : IUser) {
    let user = await this.userModel.updateOne({
      _id : updateUserDto._id
    }, {...updateUserDto, updateBy : {
      _id : User._id,
      email : User.email
    }})
    return user;
  }
  async register(registerUserDto: RegisterUserDto){
    const hashPassWord = await this.hashPassWord(registerUserDto.password)
    const isExist = await this.userModel.findOne({email : registerUserDto.email})
    if(isExist){
      throw new BadRequestException(`Email : ${registerUserDto.email} đã tồn tại trên hệ thống!`);
    }
    return this.userModel.create({...registerUserDto, password : hashPassWord, role : "USER"})
  }
  async remove(id: string, User : IUser) {
    if(!mongoose.Types.ObjectId.isValid(id)) return 'not found user'
    await this.userModel.updateOne({
      _id : id
    }, {deletedBy : {
      _id : User._id,
      email : User.email
    }})
    return this.userModel.softDelete({
      _id : id
    })
  }
  async findAll(current : number, pageSize : number, qs : string) {
    const {filter, sort, population} = aqp(qs);
    delete filter.current
    delete filter.pageSize
    let offset = (current - 1) * (pageSize)
    let defaultLimit = pageSize ? pageSize : 10
    const totalItems = await this.userModel.countDocuments()
    const totalPages = Math.ceil(totalItems / defaultLimit)
    const result = await this.userModel.find(filter)
    .skip(offset)
    .select('-password')
    .limit(defaultLimit)
    .sort(sort as any)
    .populate(population)
    .exec()
    return {
      meta : {
        current: current,
        pageSize : pageSize,
        pages : totalPages,
        total : totalItems
      },
      result
    }
  }

  async findOne(id: string) {
    let user = await this.userModel.findOne({_id : id})
  
    if(!user) return {
      message : "User not found!"
    }
    return user
  }
  findOneByUserName(username : string) {
   return this.userModel.findOne({
    email : username
   })
  
  }
  isValidPassWord(password : string, hash : string){
    return compareSync(password, hash)
  }
  updateUserToken = async(refreshToken : string, _id : string) => {
    return await this.userModel.updateOne({
      _id
    }, {refreshToken})
  }
  findUserByToken = async (refreshToken : string) =>{
    return await this.userModel.findOne({refreshToken})
}
}
