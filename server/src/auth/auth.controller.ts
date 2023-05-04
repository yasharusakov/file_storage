import {Body, Controller, HttpCode, Post, Res, UsePipes, ValidationPipe, UseGuards, Req, Get} from '@nestjs/common'
import {AuthService} from './auth.service'
import {AuthDto} from './dto/auth.dto'
import {AuthGuard} from './auth.guard'
import {Request, Response} from 'express'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @Post('registration')
    async registration(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
        const userData = await this.authService.registration(dto)
        res.cookie('refreshToken', userData.tokens.refreshToken, {httpOnly: true})
        return {user: userData.user, accessToken: userData.tokens.accessToken}
    }

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: AuthDto, @Res({passthrough: true}) res: Response) {
        const {user, tokens} = await this.authService.login(dto)
        res.cookie('refreshToken', tokens.refreshToken, {httpOnly: true})
        return {user, accessToken: tokens.accessToken}
    }

    @HttpCode(200)
    @UsePipes(ValidationPipe)
    @Get('refresh')
    async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const {refreshToken} = req.cookies
        const userData = await this.authService.refresh(refreshToken)
        res.cookie('refreshToken', refreshToken, {httpOnly: true})
        return userData
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res({passthrough: true}) res: Response) {
        const {refreshToken} = req.cookies
        res.clearCookie('refreshToken')
        return await this.authService.logout(refreshToken)
    }
}