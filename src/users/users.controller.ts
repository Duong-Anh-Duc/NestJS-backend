import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/auth/decorater/customize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  @ResponseMessage("Create a new User")
  create(
  @Body() createUserDto : CreateUserDto, @User() user : IUser
  ) {
    return this.usersService.create(createUserDto, user);
  }

  @Get()
  @ResponseMessage("Fetch user with paginate")
  findAll(
    @Query("current") currentPage : string,
    @Query("pageSize") limit : string,
    @Query() qs : string
  ) {
    return this.usersService.findAll(+currentPage, +limit , qs);
  }
  @Public()
  
  @Get(':id')
  @ResponseMessage("Fetch user by id")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  @Patch()
  @ResponseMessage("Update a User")
  update(@Body() updateUserDto: UpdateUserDto, @User() user : IUser) {
    return this.usersService.update(updateUserDto, user);
  }
  @Delete(':id')
  @ResponseMessage("Delete a User")
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.usersService.remove(id, user);
  }
}
