
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateResumeDto {
    @IsNotEmpty()
    @IsEnum(["PENDING", "REVIEWING", "APPROVED", "REJECTED"])
    @IsString()
    status: string;
}