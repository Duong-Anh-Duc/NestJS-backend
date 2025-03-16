import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/user.interface';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeDocument } from './schemas/resume.schema';

@Injectable()
export class ResumesService {
  constructor(@InjectModel(Resume.name) private resumeModel : SoftDeleteModel<ResumeDocument>){

  }
  async create(createResumeDto: CreateResumeDto, user : IUser) {
    let resume = await this.resumeModel.create({
      ...createResumeDto,
      email : user.email,
      userId : user._id,
      
      history : [
        {
          status : "PENDING",
          updatedAt : new Date(),
          updatedBy : {
            _id : user._id,
            email : user.email
          }
        }
      ],
      createdBy : {
        _id : user._id,
        email : user.email
      }
    })
    return {
      _id : resume._id,
      createdAt : resume.createdAt
    }
  }

  async findAll(currentPage : number, pageSize : number, qs : string) {
   const {filter, population, sort, projection} = aqp(qs)
   delete filter.currentPage
   delete filter.pageSize
   let defaultLimit = pageSize ? pageSize : 10
   let offset = (currentPage - 1) * defaultLimit
   let totalItems = await this.resumeModel.countDocuments()
   let totalPage = Math.ceil(totalItems / defaultLimit)
   let result = await this.resumeModel.find(filter).sort().populate(population).select(projection).skip(offset).limit(defaultLimit).exec()
   return {
    meta : {
      current : currentPage, // trang hiện tại
      pageSize : defaultLimit, // số lượng bản ghi đã lấy
      pages : totalPage, // tổng số trang với điều kiện query
      total : totalItems 
    },
    result
   }
  }
  getResumeByUser = async (user : IUser) => {
    let resumeByUser = await this.resumeModel.find({userId : user._id})
    return resumeByUser
  }
  findOne(id: string) {
    if(!mongoose.Schema.Types.ObjectId){
      return 'Id khong hop le'
    }
    let resume = this.resumeModel.findOne({_id : id})
    if(!resume){
      return 'Resume not found'
    }
    return resume
  }

  update(id: string, updateResumeDto: UpdateResumeDto, user : IUser) {
    const newHistory = {
      status: updateResumeDto.status,
        updatedAt: new Date(),
        updatedBy: {
            _id: user._id,
            email: user.email
        }
    }
    return this.resumeModel.updateOne({_id : id}, { 
      $push : {history : newHistory},
      
      updateBy : {
        _id : user._id,
        email : user.email
      }
    })
  }

  async remove(id: string, user : IUser) {
   await this.resumeModel.updateOne({_id : id},
    {deleteBy : {
      _id : user._id,
      email : user.email
    }})
    return this.resumeModel.softDelete({_id : id})
  }
}