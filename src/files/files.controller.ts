import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseMessage } from 'src/auth/decorater/customize';
import { FilesService } from './files.service';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @ResponseMessage('Upload Single File')
  @Post('upload')
  @UseInterceptors(FileInterceptor('fileUpload'))
   uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType : /png|jpg|jpeg|gif|bmp|svg|webp|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|zip|rar|mp3|mp4|avi|mkv|mov/,
    }).addMaxSizeValidator({
      maxSize : 1024 * 1024
    }).build({
      errorHttpStatusCode : HttpStatus.UNPROCESSABLE_ENTITY
    })
   ) file : Express.Multer.File){
    return {fileName : file.filename}
   }
}
