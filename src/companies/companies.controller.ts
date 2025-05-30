import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/auth/decorater/customize';
import { AllExceptionsFilter } from 'src/core/filter/http-exception.filter';
import { IUser } from 'src/users/user.interface';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user : IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }
  @Public()
  @UseFilters(new AllExceptionsFilter())
  @Get() 
  @ResponseMessage("List Company")
  findAll(@Query('current' ) currentPage : string, @Query('pageSize') limit : string, @Query() qs : string) {
    return this.companiesService.findAll(+currentPage, +limit, qs);
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @User() user : IUser) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.companiesService.remove(id, user);
  }
}
