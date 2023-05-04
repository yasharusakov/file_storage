import {Module} from '@nestjs/common'
import {UsersController} from './users.controller'
import {UsersService} from './users.service'
import {MongooseModule} from '@nestjs/mongoose'
import {Users, UsersSchema} from './users.schema'
import {TokenModule} from '../token/token.module'

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        MongooseModule.forFeature([{name: Users.name, schema: UsersSchema}]),
        TokenModule
    ],
    exports: [UsersService]
})
export class UsersModule {}
