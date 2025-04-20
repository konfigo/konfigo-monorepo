import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private _configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const authHeader = req.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(`Authorization header missing`);
    }
    try {
      const token = authHeader.split("Bearer ")[1];

      const jwtSecret =
        this._configService.get("KONFIGO_JWT_SECRET") || "jwt_secret";
      const decoded = jwt.verify(token, jwtSecret);

      req.user = decoded;
      console.log(decoded);
      return true;
    } catch (_) {
      throw new UnauthorizedException(`Couldn't verify authorization token`);
    }
  }
}
