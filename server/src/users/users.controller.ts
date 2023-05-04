import {Controller, Get, HttpCode, UseGuards} from '@nestjs/common'
import {UsersService} from './users.service'
import {AuthGuard} from '../auth/auth.guard'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get()
    async getUsers() {
        return await this.usersService.getUsers()
    }
}