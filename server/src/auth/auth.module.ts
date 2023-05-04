import {Module} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthController} from './auth.controller'
import {UsersModule} from '../users/users.module'
import {TokenModule} from '../token/token.module'
import {ConfigModule} from '@nestjs/config'
import {JwtModule} from '@nestjs/jwt'

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env'}),
        JwtModule.register({secret: process.env.JWT_SECRET}),
        UsersModule,
        TokenModule
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}