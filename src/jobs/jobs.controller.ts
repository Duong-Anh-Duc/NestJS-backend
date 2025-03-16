import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/auth/decorater/customize';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IUser } from 'src/users/user.interface';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}
  @UseGuards(JwtAuthGuard)
  @ResponseMessage("Create a new job")
  @Post()
  create(@Body() createJobDto: CreateJobDto, @User() user : IUser) {
    return this.jobsService.create(createJobDto, user);
  }
  @Public()
  @Get()
  findAll(@Query("current") currentPage : string, @Query("pageSize") limit : string, @Query() qs : string) {
    return this.jobsService.findAll(+currentPage, +limit, qs);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto, @User() user : IUser) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.jobsService.remove(id, user);
  }
}
