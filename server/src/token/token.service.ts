import {Injectable} from '@nestjs/common'
import {JwtService} from '@nestjs/jwt'
import {InjectModel} from '@nestjs/mongoose'
import {Token} from './token.schema'
import {Model} from 'mongoose'

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        @InjectModel(Token.name) private tokenModel: Model<Token>,
    ) {}

    generateTokens(userId: string) {
        const payload = {id: userId}
        const accessToken = this.generateAccessToken(payload)
        const refreshToken = this.generateRefreshToken(payload)
        return {accessToken, refreshToken}
    }

    generateAccessToken(payload) {
        const accessToken = this.jwtService.sign(payload, {expiresIn: '1h'})
        return accessToken
    }

    generateRefreshToken(payload) {
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'})
        return refreshToken
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await this.tokenModel.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken: string) {
        const tokenData = await this.tokenModel.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await this.tokenModel.findOne({refreshToken})
        return tokenData
    }

    validateToken(refreshToken: string) {
        try {
            const result = this.jwtService.verify(refreshToken)
            return result
        } catch (err) {
            return null
        }
    }
}