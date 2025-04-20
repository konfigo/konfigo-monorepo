import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { LoginInput, LoginOutput } from "./account.type";
import { ConfigService } from "@nestjs/config";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

@Injectable()
export class AccountService {
  private defaultAdminPassword?: string;
  private jwtSecret: string;
  private expireTime: string;

  constructor(
    private _configService: ConfigService,
    @InjectRepository(Account)
    private readonly _accountRepository: Repository<Account>,
  ) {
    this.defaultAdminPassword = this._configService.get(
      "KONFIGO_DEFAULT_ADMIN_PASSWORD",
    );
    this.jwtSecret =
      this._configService.get("KONFIGO_JWT_SECRET") || "jwt_secret";
    this.expireTime = this._configService.get("KONFIGO_JWT_EXPIRATION") || "1h";

    _accountRepository
      .countBy({
        username: "admin",
      })
      .then((count: number) => {
        if (count != 0) {
          return;
        }

        if (!this.defaultAdminPassword) {
          throw new Error("KONFIGO_DEFAULT_ADMIN_PASSWORD is not set.");
        }

        this.createAccount("admin", this.defaultAdminPassword);
      });
  }

  async createAccount(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const created = await this._accountRepository.save({
      username: username,
      password: hashedPassword,
    });

    return created;
  }

  async login({ username, password }: LoginInput): Promise<LoginOutput> {
    const user = await this._accountRepository.findOneBy({
      username: username,
    });

    if (!user) {
      throw new NotFoundException("User name or password is wrong");
    }

    if (user.disabled) {
      throw new NotFoundException("User is disabled");
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      throw new NotFoundException("User name or password is wrong");
    }

    if (!this.jwtSecret) {
      throw new InternalServerErrorException("Unknown error occured");
    }

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      this.jwtSecret,
      { expiresIn: this.expireTime },
    );

    user.lastLoginAt = new Date();
    await this._accountRepository.save(user);

    return {
      token,
    };
  }
}
