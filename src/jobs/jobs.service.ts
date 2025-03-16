import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobsService {
  constructor(@InjectModel(Job.name) private jobModel : SoftDeleteModel<JobDocument>){

  }
  async create(createJobDto: CreateJobDto, user : IUser) {
    let job =  await this.jobModel.create({
      ...createJobDto, createdBy : {
        _id : user._id,
        email : user.email
      }
    })
    return {
      _id  : job._id,
      createdAt : job.createdAt
    }
  }
  async update(id: string, updateJobDto: UpdateJobDto, user : IUser) {
     return await this.jobModel.updateOne({_id : id}, {
      ...updateJobDto, 
      updateBy : {
        _id : user._id,
        email : user.email
      }
     })
  }
  async remove(id: string, user : IUser) {
   await this.jobModel.updateOne({_id : id}, {
    deletedBy : {
      _id : user._id,
      email : user.email
    }
   })
   return this.jobModel.softDelete({_id : id})
  }
  findOne(id: string) {
    let job = this.jobModel.findOne({_id : id})
    return job
  }

  async findAll(currentPage : number, limit : number, qs : string) {
    const {filter, sort, projection, population} = aqp(qs)
    delete filter.current
    delete filter.pageSize
    let defaultLimit = limit ? limit : 10
    let offset = (currentPage - 1) * (limit)
    const totalItems =  await (await this.jobModel.find()).length
    const totalPages = Math.ceil(totalItems / defaultLimit)
    const result = await this.jobModel.find(filter).skip(offset).limit(defaultLimit).sort().populate(population).exec()
    return {
      meta : {
        current : currentPage, // trang hiện tại
        pageSize : limit, // số lượng bản ghi đã lấy
        pages : totalPages, // tổng số trang với điều kiện query
        total : totalItems // Tổng số lượng bản ghi trong db
      },
      result
    }
  }


}
