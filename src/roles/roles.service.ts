import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { ADMIN_ROLE } from 'src/databases/sample';
import { IUser } from 'src/users/user.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role, RoleDocument } from './schemas/role.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel : SoftDeleteModel<RoleDocument>){}
  async create(createRoleDto: CreateRoleDto, user : IUser) {
   let check = await this.roleModel.findOne({name : createRoleDto.name})
   if(check){
    throw new BadRequestException("Name đã tồn tại vụi lòng chọn lại")
   }
   let result = await this.roleModel.create({
    ...createRoleDto,
    createdBy : {
      _id : user._id,
      email : user.email
    }
   })
   return {
    _id : result._id,
    createdAt : result.createdAt
   }
  }
  update(id: string, updateRoleDto: UpdateRoleDto, user : IUser) {
    return this.roleModel.updateOne({_id : id},
      {
        ...updateRoleDto, 
        updatedBy : {
          _id : user._id,
          email : user.email
        }
      }
    )
  }
  async findAll(current : number, pageSize : number, qs : string) {
    const {filter, population, sort, projection} = aqp(qs)
    delete filter.current
    delete filter.pageSize
    const limit = pageSize ? pageSize : 10
    const offset = (current - 1) * limit
    const totalItems = await this.roleModel.countDocuments()
    const totalPages = Math.ceil(totalItems / limit)
    let result = await this.roleModel.find(filter).skip(offset).limit(limit)
    return {
        meta : {
          current : current, // trang hiện tại
          pageSize : limit, // số lượng bản ghi đã lấy
          pages : totalPages, // tổng số trang với điều kiện query
          total : totalItems // Tổng số lượng bản ghi trong db
        },
        result
    }
  }
   async findOne(id: string) {
     if(!mongoose.Schema.Types.ObjectId) throw new BadRequestException('not found role')
     return (await this.roleModel.findOne({_id : id}))
    .populate({
      path : "permissions",
    })

   }
   async remove(id: string, user : IUser) {
    const foundRole = await this.roleModel.findById(id)
    if(foundRole.name === ADMIN_ROLE){
      throw new BadRequestException("Không thể xoá role admin")
    }
    await this.roleModel.updateOne({
     _id : id
    }, {
     deletedBy : {
       _id : user._id,
       email : user.email
     }
    })
    return this.roleModel.softDelete({
     _id : id
    })
   }


}
