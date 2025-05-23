import { Type } from "class-transformer";
import { IsEmail, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import mongoose from "mongoose";
class Company{
    @IsNotEmpty()
    _id : mongoose.Schema.Types.ObjectId
    @IsNotEmpty()
    name : string
}
export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty({message : "Email không được để trống"})
    email : string;
    @IsNotEmpty({message : "Password không được để trống"})
    password : string;
    @IsNotEmpty({message : "Age không được để trống"})
    name : string;
    @IsNotEmpty({message : "Gender không được để trống"})
    gender : string;
    @IsNotEmpty({message : "Address không được để trống"})
    address : string;
    @IsNotEmpty({message : "Role không được để trống"})
    @IsMongoId({message : 'Role có định dạng là mongoid'})
    role : string;
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company : Company;
}
export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty({message : "Email không được để trống"})
    email : string;

    @IsNotEmpty({message : "Password không được để trống"})
    password : string;
    @IsNotEmpty({message : "Age không được để trống"})
    name : string;
    @IsNotEmpty({message : "Gender không được để trống"})
    gender : string;
    @IsNotEmpty({message : "Address không được để trống"})
    address : string;
}
