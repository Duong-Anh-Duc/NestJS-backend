import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Permission } from "src/permissions/schemas/permission.schema";

export type RoleDocument = HydratedDocument<Role>

@Schema({timestamps : true})
export class Role{
    @Prop()
    name : string;
    @Prop() 
    description : string
    @Prop()
    isActive : boolean
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] }) 
    permissions: Permission[];
    @Prop({type : Object})
    updatedBy: {
        _id : string;
        email : string;
    }
    
    @Prop({type : Object})
    createdBy: {
        _id : string;
        email : string;
    }
    @Prop({type : Object})
    deletedBy : {
        _id : string;
        email : string;
    }
    @Prop()
    createdAt : Date;
    @Prop()
    updatedAt : Date;
    @Prop()
    isDeleted : boolean;
    @Prop()
    deletedAt : Date;
}
export const RoleSchema = SchemaFactory.createForClass(Role)