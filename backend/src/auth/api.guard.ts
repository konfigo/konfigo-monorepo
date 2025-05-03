import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiGuard implements CanActivate {
  apiKey: string;

  constructor(
    private readonly reflector: Reflector,
    private _configService: ConfigService,
  ) {
    this.apiKey = this._configService.get("KONFIGO_API_KEY") || "";
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers?.authorization;

    if (!authHeader || authHeader !== this.apiKey) {
      return false;
    }

    return true;
  }
}
