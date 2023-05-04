import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {AuthModule} from './auth/auth.module'
import {UsersModule} from './users/users.module'
import {MongooseModule} from '@nestjs/mongoose'
import {TokenModule} from './token/token.module'
import {ServeStaticModule} from '@nestjs/serve-static'
import {resolve} from 'path'
import {FilesModule} from './files/files.module'

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env'}),
        MongooseModule.forRoot(process.env.DB_URL),
        ServeStaticModule.forRoot({
            rootPath: resolve(__dirname, 'static')
        }),
        AuthModule,
        UsersModule,
        TokenModule,
        FilesModule,
    ]
})
export class AppModule {}