import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  Component,
  CreateComponentInput,
  GetComponentInput,
} from "./component.type";
import { InjectRepository } from "@nestjs/typeorm";
import { Component as ComponentEntity } from "src/entities/component.entity";
import { IsNull, Repository } from "typeorm";
import { UserAccount } from "src/account/account.type";

@Injectable()
export class ComponentService {
  constructor(
    @InjectRepository(ComponentEntity)
    private componentRepo: Repository<ComponentEntity>,
  ) {}

  /**
   * Retrieves a list of components based on the specified parent component ID.
   * If no parent ID is provided, it retrieves components with no parent.
   *
   * @param {GetComponentInput} input - An object containing the optional parent ID.
   * @returns {Promise<Component[]>} A promise that resolves to an array of components.
   */
  async getComponentByParent({
    parent,
  }: GetComponentInput): Promise<Component[]> {
    const components = this.componentRepo.findBy({
      parent: parent
        ? {
            id: parent,
          }
        : IsNull(),
    });

    return components;
  }

  async createComponent(
    { name, parentId }: CreateComponentInput,
    user: UserAccount,
  ) {
    let parent: ComponentEntity | null = null;

    if (parentId) {
      parent = await this.componentRepo.findOne({
        where: {
          id: parentId,
        },
      });

      if (!parent) {
        throw new NotFoundException(`Parent component not found`);
      }
    }

    const exists = await this.componentRepo.countBy({
      name: name,
      parent: parent || undefined,
    });

    if (exists !== 0) {
      throw new BadRequestException(`Component already exists`);
    }

    const created = await this.componentRepo.save({
      name,
      createdBy: {
        id: user.id,
      },
      parent: parent || undefined,
    });

    return created;
  }

  async renameComponent(id: string, newName: string) {
    const component = await this.componentRepo.findOne({
      where: {
        id,
      },
    });

    if (!component) {
      throw new NotFoundException(`Component not found`);
    }

    component.name = newName;
    await this.componentRepo.save(component);

    return component;
  }

  async duplicateComponent(id: string, user: UserAccount) {
    const component = await this.componentRepo.findOne({
      where: {
        id,
      },
    });

    if (!component) {
      throw new NotFoundException(`Component not found`);
    }

    const newComponent = await this.componentRepo.save({
      name: `${component.name}_copy`,
      parent: component.parent,
      createdBy: {
        id: user.id,
      },
    });

    return newComponent;
  }

  async deleteComponent(id: string) {
    const component = await this.componentRepo.findOne({
      where: {
        id,
      },
    });

    if (!component) {
      throw new NotFoundException(`Component not found`);
    }

    await this.componentRepo.remove(component);

    return true;
  }
}
