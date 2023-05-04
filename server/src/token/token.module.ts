import {Module} from '@nestjs/common'
import {TokenService} from './token.service'
import {MongooseModule} from '@nestjs/mongoose'
import {Token, TokenSchema} from './token.schema'
import {ConfigModule} from '@nestjs/config'
import {JwtModule} from '@nestjs/jwt'

@Module({
    imports: [
        MongooseModule.forFeature([{name: Token.name, schema: TokenSchema}]),
        ConfigModule.forRoot({envFilePath: '.env'}),
        JwtModule.register({secret: process.env.JWT_SECRET})
    ],
    providers: [TokenService],
    exports: [TokenService]
})
export class TokenModule {}