import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtConstant } from "./jwt.constants";
import { ExtractJwt, Strategy } from "passport-jwt" ;


@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstant.secret,
        }) ; 

    }

    async validate( payload: any ){
        return{ idAuth: payload.idAuth , name: payload.name }
    }

}