import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SERVICE_SECRET!,
        })
    }

    async validate(payload: any) {
     
        try {
            const user = await this.authService.findCurrentUser(payload.sub)

            return user.data;
        } catch (e) {
            throw new UnauthorizedException('Invalid Token...')
        }
    }

}
