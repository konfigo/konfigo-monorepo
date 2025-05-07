import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiGuard } from "src/auth/api.guard";
import { ApiService } from "./api.service";

@Controller("api")
@UseGuards(ApiGuard)
export class ApiController {
  constructor(private readonly _apiService: ApiService) {}

  @Get("*path")
  handleGet(@Param("path") path: string[]) {
    return this._apiService.getConfigsForPath(path);
  }
}
