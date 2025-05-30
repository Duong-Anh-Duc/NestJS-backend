import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Permission, PermissionSchema } from './schemas/permission.schema';

@Module({
  imports : [MongooseModule.forFeature([{
    name : Permission.name,
    schema : PermissionSchema
  } 
  ])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
