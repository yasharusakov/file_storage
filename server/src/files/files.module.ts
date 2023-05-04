import {Module} from '@nestjs/common'
import {FilesService} from './files.service'
import {FilesController} from './files.controller'
import {MongooseModule} from '@nestjs/mongoose'
import {Files, FilesSchema} from './files.schema'
import {TokenModule} from '../token/token.module'

@Module({
    imports: [
        MongooseModule.forFeature([{name: Files.name, schema: FilesSchema}]),
        TokenModule
    ],
    controllers: [FilesController],
    providers: [FilesService]
})
export class FilesModule {}