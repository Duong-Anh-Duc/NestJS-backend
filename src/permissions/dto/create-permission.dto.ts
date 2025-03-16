import { Prop } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty({message : 'Name không được để trống'})
    @Prop()
    name : string;
    @IsString()
    @IsNotEmpty({message : 'ApiPath không được để trống'})
    @Prop() 
    apiPath : string
    @IsString()
    @IsNotEmpty({message : 'Method không được để trống'})
    @Prop()
    method : string
    @IsString()
    @IsNotEmpty({message : 'Module không được để trống'})
    @Prop()
    module : string
}
