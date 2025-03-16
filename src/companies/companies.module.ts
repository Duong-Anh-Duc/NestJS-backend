import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { Company, CompanySchema } from './schemas/company.schema';

@Module({
  imports : [MongooseModule.forFeature([{
    name : Company.name,
    schema : CompanySchema
  }])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes({path : 'v1/companies', method : RequestMethod.GET})
  }
}
