import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission, PermissionDocument } from './schemas/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel (Permission.name) private permissionModel : SoftDeleteModel<PermissionDocument>){}

  async create(createPermissionDto: CreatePermissionDto, user : IUser){
    let ApiMethod = createPermissionDto.apiPath + createPermissionDto.method
    let Items = await this.permissionModel.find()
    let check = Items.some((item) => {
      return item.apiPath + item.method == ApiMethod
    })
    if(check){
      throw new BadRequestException(`Api ${createPermissionDto.apiPath} + Method ${createPermissionDto.method} đã tồn tại`)
    }
    let permission = await this.permissionModel.create({
      ...createPermissionDto,
      createdBy : {
        _id : user._id,
        email : user.email
      }
    })
    return {
      _id : permission._id,
      createdAt : permission.createdAt
    }
  }
  async findAll(current : number, pageSize : number, qs : string) {
    const {filter, population, sort, projection} = aqp(qs)
    delete filter.current
    delete filter.pageSize
    const limit = pageSize ? pageSize : 10
    const offset = (current - 1) * limit
    const totalItems = await this.permissionModel.countDocuments()
    const totalPages = Math.ceil(totalItems / limit)
    let result = await this.permissionModel.find(filter).skip(offset).limit(limit).populate(population).exec()
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
    if(!mongoose.Schema.Types.ObjectId) return 'id không hợp lệ'
    let permission = await this.permissionModel.findOne({_id : id})
    return permission
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto, user : IUser) {
    return this.permissionModel.updateOne({_id : id},
      {
        ...updatePermissionDto,
        updatedBy : {
          _id : user._id,
          email : user.email
        }
      }
    )
  }

  async remove(id: string, user : IUser) {
   await this.permissionModel.updateOne({
    _id : id
   }, {
    deletedBy : {
      _id : user._id,
      email : user.email
    }
   })
   return this.permissionModel.softDelete({
    _id : id
   })
  }
}
