import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Users} from './users.schema'
import {Model} from 'mongoose'
import {AuthDto} from '../auth/dto/auth.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<Users>,
    ) {}

    async getUsers() {
        const users = await this.userModel.find()
        return users
    }

    async createUser(dto: AuthDto) {
        const hashPassword = await bcrypt.hash(dto.password, 8)
        const user = await this.userModel.create({...dto, password: hashPassword})
        return user
    }

    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({email})
        return user
    }

    async findUserById(id: string) {
        const user = await this.userModel.findById(id)
        return user
    }
}