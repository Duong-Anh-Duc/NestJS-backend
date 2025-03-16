import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResponseMessage, User } from 'src/auth/decorater/customize';
import { IUser } from 'src/users/user.interface';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ResponseMessage('Create a new role')
  create(@Body() createRoleDto: CreateRoleDto, @User() user : IUser) {
    return this.rolesService.create(createRoleDto, user);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @User() user : IUser) {
    return this.rolesService.update(id, updateRoleDto, user);
  }
  @Get()
  @ResponseMessage('Fetch roles with paginate')
  findAll(@Query('current') current : string, @Query('pageSize') pageSize : string, @Query() qs : string) {
    return this.rolesService.findAll(+current, +pageSize, qs);
  }

  @Get(':id')
  @ResponseMessage('Fetch a role by id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.rolesService.remove(id, user);
  }
}
