import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import {Observable} from 'rxjs'
import {TokenService} from '../token/token.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private tokenService: TokenService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authorizationHeader = request.headers.authorization.split(' ')
        const bearer = authorizationHeader[0]
        const token = authorizationHeader[1]
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException()
        }
        const user = this.tokenService.validateToken(token)
        if (!user) {
            throw new UnauthorizedException()
        }
        request.user = user
        return true
    }
}
