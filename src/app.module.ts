import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from "@nestjs/mongoose";
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { FilesModule } from './files/files.module';
import { JobsModule } from './jobs/jobs.module';
import { PermissionsModule } from './permissions/permissions.module';
import { ResumesModule } from './resumes/resumes.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { DatabasesModule } from './databases/databases.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : async(configService : ConfigService) => ({
        uri : configService.get<string>('MONGODB_URI'),
        connectionFactory : (connection) => {
          connection.plugin(softDeletePlugin);
          return connection
        }
      }),
      inject : [ConfigService]
    }),
    ConfigModule.forRoot(
      {
        isGlobal : true,
      }
    ),
    UsersModule,
    AuthModule,
    CompaniesModule,
    JobsModule,
    FilesModule,
    ResumesModule,
    PermissionsModule,
    RolesModule,
    DatabasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
