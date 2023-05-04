import {IsEmail, IsString, MinLength} from 'class-validator'

export class AuthDto {
    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(6)
    readonly password: string
}