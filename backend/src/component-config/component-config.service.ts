import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Component } from "src/component/component.type";
import { Config } from "src/entities/config.entity";
import { Repository } from "typeorm";
import {
  ComponentConfig,
  CreateConfigInput,
  GetHistoryForConfig,
} from "./component-config.type";

@Injectable()
export class ComponentConfigService {
  constructor(
    @InjectRepository(Config)
    private _configRepository: Repository<Config>,
  ) {}

  /**
   * Retrieves the latest config for a given component.
   * @param component the component to find the latest config for
   * @returns the latest config for the given component
   * @throws {NotFoundException} if no config is found for the component
   */
  async getLatestConfigForComponent(
    component: Component,
  ): Promise<ComponentConfig> {
    const latest = await this._configRepository.findOne({
      where: {
        component: {
          id: component.id,
        },
      },
      order: {
        revision: "DESC",
      },
    });

    if (!latest) {
      throw new NotFoundException(
        `Config not found for component ${component.name} (${component.id})`,
      );
    }

    return latest;
  }

  async getHistoryForConfig(
    input: GetHistoryForConfig,
  ): Promise<ComponentConfig[]> {
    const history = await this._configRepository.find({
      where: {
        component: {
          id: input.componentId,
        },
      },
      order: {
        revision: "DESC",
      },
      take: input.take,
      skip: input.skip,
    });

    return history;
  }

  parseAndFormatJson(payload: string): string {
    try {
      JSON.parse(payload);
    } catch (error) {
      throw new BadRequestException(`Malformed JSON configuration`);
    }

    const minifiedJson = JSON.stringify(JSON.parse(payload));
    return minifiedJson;
  }

  async createComponentConfig({
    commitMessage,
    componentId,
    payload,
  }: CreateConfigInput): Promise<ComponentConfig> {
    const formattedPayload = this.parseAndFormatJson(payload);

    const revisionCount = await this._configRepository.count({
      where: {
        component: {
          id: componentId,
        },
      },
    });

    const saved = await this._configRepository.save({
      payload: formattedPayload,
      commitMessage,
      component: {
        id: componentId,
      },
      revision: revisionCount,
    });

    return saved;
  }
}
