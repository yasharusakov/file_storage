import {NestFactory} from '@nestjs/core'
import {AppModule} from './app.module'
import * as cookieParser from 'cookie-parser'
import {json, urlencoded} from 'express'

const PORT = process.env.PORT || 5000

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.use(cookieParser())
    app.enableCors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
    app.use(json({limit: '50mb'}))
    app.use(urlencoded({extended: true, limit: '50mb'}))
    await app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
}

bootstrap()
