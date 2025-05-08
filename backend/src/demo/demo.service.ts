import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { AccountService } from "src/account/account.service";
import { Account } from "src/entities/account.entity";
import { Component } from "src/entities/component.entity";
import { Config } from "src/entities/config.entity";
import { Stage as StageEntity } from "src/entities/stage.entity";
import { DataSource, Repository } from "typeorm";
import data from "./data.json";

@Injectable()
export class DemoService {
  private defaultAdminPassword?: string;

  constructor(
    @InjectRepository(StageEntity)
    private _stageRepo: Repository<StageEntity>,
    @InjectRepository(Config)
    private _configRepo: Repository<Config>,
    @InjectRepository(Component)
    private _componentConfig: Repository<Component>,
    @InjectRepository(Account)
    private _accountRepo: Repository<Account>,
    private _accountService: AccountService,
    private _configService: ConfigService,
    @InjectDataSource()
    private _dataSource: DataSource,
  ) {
    this.defaultAdminPassword = this._configService.get(
      "KONFIGO_DEFAULT_ADMIN_PASSWORD",
    );
    this.populateDemoData();
  }

  async populateDemoData() {
    const adminCount = await this._accountRepo.countBy({
      username: "admin",
    });

    if (adminCount != 0) {
      return;
    }

    if (!this.defaultAdminPassword) {
      throw new Error("KONFIGO_DEFAULT_ADMIN_PASSWORD is not set.");
    }

    const adminAccount = await this._accountService.createAccount(
      "admin",
      this.defaultAdminPassword,
    );

    // const stages = await this._stageRepo.save(
    //   ["Organization", "Service", "Environment"].map((name) => ({
    //     name: name,
    //     createdBy: adminAccount,
    //   })),
    // );

    // // Create organizations
    // const organizations = await this._componentConfig.save(
    //   Object.keys(data.organizations).map((org) => ({
    //     name: org,
    //     createdBy: adminAccount,
    //   })),
    // );

    // // Create services
    // for (const org of organizations) {
    //   const services = await this._componentConfig.save(
    //     Object.keys(data.organizations[org.name].microservices).map(
    //       (service) => ({
    //         name: service,
    //         createdBy: adminAccount,
    //         parent: org,
    //       }),
    //     ),
    //   );

    //   // Create environments
    //   for (const service of services) {
    //     const environments = await this._componentConfig.save(
    //       Object.keys(
    //         data.organizations[org.name].microservices[service.name]
    //           .environments,
    //       ).map((env) => ({
    //         name: env,
    //         createdBy: adminAccount,
    //         parent: service,
    //       })),
    //     );

    //     // Create configs
    //     for (const env of environments) {
    //       await this._configRepo.save({
    //         createdBy: adminAccount,
    //         component: env,
    //         payload: JSON.stringify(
    //           data.organizations[org.name].microservices[service.name]
    //             .environments[env.name].configurations,
    //         ),
    //       });
    //     }
    //   }
    // }
  }
}
