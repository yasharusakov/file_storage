import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'
import {Files} from './files.schema'

@Injectable()
export class FilesService {
    constructor(
        @InjectModel(Files.name) private filesModel: Model<Files>
    ) {
    }

    async getFiles(userId: string) {
        const userFiles = await this.filesModel.findOne({userId})
        return userFiles
    }

    async uploadFiles(userId: string, files: Array<Express.Multer.File>) {
        const userFiles = await this.filesModel.findOne({userId})
        if (!userFiles?.files) {
            return await this.filesModel.create({userId, files})
        }
        userFiles.files = [...userFiles.files, ...files]
        await userFiles.save()
        return files
    }
}