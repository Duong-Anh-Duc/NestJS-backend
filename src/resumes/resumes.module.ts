import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumesController } from './resumes.controller';
import { ResumesService } from './resumes.service';
import { Resume, Resumeschema } from './schemas/resume.schema';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
  imports : [MongooseModule.forFeature([{name : Resume.name, schema : Resumeschema}])]
})
export class ResumesModule {}
