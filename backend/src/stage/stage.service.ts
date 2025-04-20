import { Injectable } from "@nestjs/common";
import { CreateStageInput, Stage } from "./stage.type";
import { Stage as StageEntity } from "src/entities/stage.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StageService {
  constructor(
    @InjectRepository(StageEntity)
    private _stageRepo: Repository<StageEntity>,
  ) {}

  /**
   * Retrieves all stages from the database.
   *
   * @returns {Promise<Stage[]>} A promise that resolves to an array of Stage objects.
   */
  async getStages(): Promise<Stage[]> {
    return this._stageRepo.find({});
  }

  async createStage({ name, description }: CreateStageInput): Promise<Stage> {
    const saved = await this._stageRepo.save({
      name,
      description,
    });

    return saved;
  }
}
