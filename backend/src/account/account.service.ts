import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { LoginInput, LoginOutput, UserAccount } from "./account.type";
import { ConfigService } from "@nestjs/config";
import { Account } from "src/entities/account.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AccountService {
  private jwtSecret: string;
  private expireTime: string;

  constructor(
    private _configService: ConfigService,
    @InjectRepository(Account)
    private readonly _accountRepository: Repository<Account>,
  ) {
    this.jwtSecret =
      this._configService.get("KONFIGO_JWT_SECRET") || "jwt_secret";
    this.expireTime = this._configService.get("KONFIGO_JWT_EXPIRATION") || "1h";
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

  async me(user: UserAccount): Promise<UserAccount> {
    const acc = await this._accountRepository.findOneBy({
      id: user.id,
    });

    if (!acc) {
      throw new NotFoundException("User not found");
    }

    return {
      id: acc?.id,
      username: acc?.username,
    };
  }
}
