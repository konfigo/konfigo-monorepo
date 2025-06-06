import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entities/account.entity";
import { AccountResolver } from "./account.resolver";

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountService, AccountResolver],
  exports: [AccountService, AccountResolver],
})
export class AccountModule {}
