import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, Min, ValidateNested } from "class-validator";
import mongoose from "mongoose";

class Company{
    @IsNotEmpty()
    _id : mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    name : string
    @IsNotEmpty()
    logo : string
}

export class CreateJobDto {
    @IsString()
    @IsNotEmpty({message : "Name không được để trống"})
    name : string
    @IsArray()
    @IsNotEmpty({message : "Skills không được để trống"})
    skills : string[]
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company : Company
    @IsNumber()
    @Min(0, {message : "Lương phải >= 0"})
    salary : number
    @IsNumber()
    @Min(1, {message : "Số lượng phải >= 1"})
    quantity : number
    @IsString()
    @IsNotEmpty({message : "Location không được để trống"})
    location : string
    @IsString()
    @IsNotEmpty({message : "Level không được để trống"})
    level : string
    @IsString()
    @IsOptional()
    @IsNotEmpty({message : "Description không được để trống"})
    description : string
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message : "Ngày bắt đầu không được để trống"})
    startDate : Date;
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty({message : "Ngày kết thúc không được để trống"})
    endDate : Date
    @IsOptional()
    @IsBoolean()
    isActive : boolean
}
