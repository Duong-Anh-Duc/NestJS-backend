import { IsEnum, IsMongoId, IsNotEmpty, IsString, IsUrl } from "class-validator";
import mongoose from "mongoose";

export class CreateResumeDto {
    @IsString()
    @IsNotEmpty()
    @IsUrl()
    url : string
    @IsNotEmpty()
    @IsEnum(["PENDING", "REVIEWING", "APPROVED", "REJECTED"])
    @IsString()
    status : string = "PENDING"
    @IsMongoId()
    @IsNotEmpty()
    companyId : mongoose.Schema.Types.ObjectId
    @IsMongoId()
    @IsNotEmpty()
    jobId : mongoose.Schema.Types.ObjectId
}
export class CreateUserCvDto {
    @IsString()
    @IsNotEmpty({message : 'url không được để trống'})
    @IsUrl()
    url : string
    @IsMongoId()
    @IsNotEmpty()
    companyId : mongoose.Schema.Types.ObjectId
    @IsMongoId()
    @IsNotEmpty()
    jobId : mongoose.Schema.Types.ObjectId
}