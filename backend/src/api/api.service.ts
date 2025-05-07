import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ComponentConfigRetrievalQuery } from "./api.query";

@Injectable()
export class ApiService {
  constructor(
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {}

  deepInherit(base, override) {
    const result: any = { ...base };

    for (const key in override) {
      if (
        override[key] !== null &&
        typeof override[key] === "object" &&
        !Array.isArray(override[key]) &&
        typeof base[key] === "object" &&
        base[key] !== null &&
        !Array.isArray(base[key])
      ) {
        result[key] = this.deepInherit(base[key], override[key]);
      } else {
        result[key] = override[key];
      }
    }

    return result;
  }

  async getConfigsForPath(path: string[]) {
    const response = await this._dataSource.query(
      ComponentConfigRetrievalQuery,
      [path.join("/")],
    );

    let obj = {};

    for (const { payload } of response) {
      if (!payload) {
        continue;
      }

      obj = this.deepInherit(obj, JSON.parse(payload));
    }

    return obj;
  }
}
