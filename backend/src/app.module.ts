import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { AccountModule } from "./account/account.module";
import { ComponentModule } from "./component/component.module";
import { ComponentConfigModule } from "./component-config/component-config.module";
import { StageModule } from "./stage/stage.module";
import { DemoModule } from "./demo/demo.module";
import { ApiModule } from "./api/api.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
    }),
    // Internal Database Connection
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("KONFIGO_INTERNAL_DATABASE_HOST"),
        port: +configService.get("KONFIGO_INTERNAL_DATABASE_PORT"),
        username: configService.get("KONFIGO_INTERNAL_DATABASE_USERNAME"),
        password: configService.get("KONFIGO_INTERNAL_DATABASE_PASSWORD"),
        database: configService.get("KONFIGO_INTERNAL_DATABASE_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        migrationsRun: true,
        migrations: [__dirname + "/**/migrations/*{.ts,.js}"],
        ssl: true,
      }),
    }),
    AccountModule,
    ComponentModule,
    ComponentConfigModule,
    StageModule,
    DemoModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
