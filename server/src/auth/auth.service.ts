import {BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common'
import {AuthDto} from './dto/auth.dto'
import {UsersService} from '../users/users.service'
import {TokenService} from '../token/token.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
    ) {}

    async registration(dto: AuthDto) {
        const candidate = await this.usersService.findUserByEmail(dto.email)
        if (candidate) throw new BadRequestException('User is already exist')
        const user = await this.usersService.createUser(dto)
        const tokens = this.tokenService.generateTokens(user.id)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {user, tokens}
    }

    async login(dto: AuthDto) {
        const user = await this.usersService.findUserByEmail(dto.email)
        if (!user) throw new BadRequestException('User not found')
        const isValidPassword = bcrypt.compare(user.password, dto.password)
        if (!isValidPassword) throw new UnauthorizedException('Invalid password')
        const tokens = this.tokenService.generateTokens(user.id)
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {user, tokens}
    }

    async refresh(refreshToken) {
        if (!refreshToken) throw new UnauthorizedException('refreshToken is required')
        const result = await this.tokenService.validateToken(refreshToken)
        if (!result) throw new UnauthorizedException('Invalid refresh token')
        const tokenFromDb = await this.tokenService.findToken(refreshToken)
        if (!tokenFromDb) throw new UnauthorizedException('Invalid refresh token')
        const user = await this.usersService.findUserById(result.id)
        if (!user) throw new BadRequestException('User not found')
        const payload = {id: user.id}
        const accessToken = this.tokenService.generateAccessToken(payload)
        await this.tokenService.saveToken(user.id, refreshToken)
        return {user, accessToken}
    }

    async logout(refreshToken: string) {
       return await this.tokenService.removeToken(refreshToken)
    }
}