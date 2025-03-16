import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ResponseMessage, User } from 'src/auth/decorater/customize';
import { IUser } from 'src/users/user.interface';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumesService } from './resumes.service';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}
  @Post()
  @ResponseMessage('Create a new resume')
  create(@Body() createResumeDto: CreateResumeDto, @User() user : IUser) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  @ResponseMessage('Fetch a list resume')
  findAll(@Query('current') currentPage : string, @Query('pageSize')pageSize : string, qs : string) {
    return this.resumesService.findAll(+currentPage, + pageSize, qs);
  }
  @ResponseMessage('Fetch a resume')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }
  @ResponseMessage('Update a resume')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto, @User() user : IUser) {
    return this.resumesService.update(id, updateResumeDto, user);
  }
  @ResponseMessage('Delete a resume')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.resumesService.remove(id, user);
  }
  @Post('by-user')
  @ResponseMessage('Fetch resume by user')
  getResumeByUser( @User() user : IUser) {
    return this.resumesService.getResumeByUser(user);
  }
}
