import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        console.error(`ERROR: ${exception.message || 'Unknown Error'}`, exception);
        response
        .status(status)
        .json({
            statusCode : status,
            timestamp : new Date().toISOString(),
            path : request.url,
            message : exception.message ||  'Internal Server Error',
        })
    }
}