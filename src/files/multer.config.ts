import { Injectable } from "@nestjs/common";
import { MulterModuleOptions, MulterOptionsFactory } from "@nestjs/platform-express";
import fs from 'fs';
import { diskStorage } from "multer";
import path, { join } from "path";
@Injectable()
export class MulterConfigService implements MulterOptionsFactory{
    getRootPath = () => {
        return process.cwd()
    }
    ensureExists(targetDirectory : string){
        fs.mkdir(targetDirectory, {recursive : true}, (error) => {
            if(!error){
                console.log('Directory successfully created, or it already exists.')
                return;
            }
            switch (error.code){
                case 'EEXIST' : 
                    break;
                case 'ENOTDIR' : 
                    break;
                default : 
                console.error(error)
                break
            }
        })
    }
    createMulterOptions(): MulterModuleOptions {
       return {
        storage : diskStorage({
            destination : (req, file, cb) => {
                const folder = req?.headers?.folder_type ?? "default"

                this.ensureExists(`public/images/${folder}`)
                cb(null, join(this.getRootPath(), `public/images/${folder}`))
            },
            filename : (req, file, cb) => {
                let extName = path.extname(file.originalname)
                let baseName = path.basename(file.originalname, extName)
                let finalName = `${baseName}-${Date.now()}${extName}`
                console.log(file)
                cb(null, finalName)
            }
        })
       }
    }
}