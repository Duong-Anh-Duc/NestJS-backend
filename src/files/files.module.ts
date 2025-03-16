import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MulterConfigService } from './multer.config';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports : [MulterModule.registerAsync({
    useClass : MulterConfigService
  })]
})
export class FilesModule {}
