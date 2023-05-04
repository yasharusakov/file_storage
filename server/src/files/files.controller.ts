import {Body, Controller, HttpCode, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common'
import {FilesService} from './files.service'
import {AuthGuard} from '../auth/auth.guard'
import {FilesInterceptor} from '@nestjs/platform-express'

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@Body('userId') userId: string, @UploadedFiles() files: any) {
        console.log(userId)
        console.log(files)
        return await this.filesService.uploadFiles(userId, files)
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Post()
    async getFiles(@Body('userId') userId: string) {
        return await this.filesService.getFiles(userId)
    }

}
