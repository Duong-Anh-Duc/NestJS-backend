import { Prop } from "@nestjs/mongoose";
import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";
import mongoose from "mongoose";
import { Permission } from "src/permissions/schemas/permission.schema";

export class CreateRoleDto {
        @IsNotEmpty({message : 'Name không được để trống'})
        @IsString()
        @Prop()
        name : string;
        @IsNotEmpty({message : 'Description không được để trống'})
        @IsString()
        @Prop() 
        description : string
        @IsNotEmpty({message : 'IsActive không được để trống'})
        @IsBoolean()
        @Prop()
        isActive : boolean
        @IsNotEmpty({message : 'Permisssions không được để trống'})
        @IsArray()
        @Prop({type : [mongoose.Schema.Types.ObjectId], ref : Permission.name})
        permissions : Permission[]
}
