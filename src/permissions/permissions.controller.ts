import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResponseMessage, User } from 'src/auth/decorater/customize';
import { IUser } from 'src/users/user.interface';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ResponseMessage('Create a new permission')
  create(@Body() createPermissionDto: CreatePermissionDto, @User() user : IUser) {
    return this.permissionsService.create(createPermissionDto, user);
  }
  @Patch(':id')
  @ResponseMessage('Update a permission')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto, @User() user : IUser) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }
  @Get()
  @ResponseMessage('Fetch permissions with paginate')
  findAll(@Query('current') current : string, @Query('pageSize') pageSize : string, @Query() qs : string) {
    return this.permissionsService.findAll(+current, +pageSize, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch a permission by id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.permissionsService.remove(id, user);
  }
}
