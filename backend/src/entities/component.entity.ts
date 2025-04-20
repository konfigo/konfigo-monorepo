import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Config } from "./config.entity";
import { Account } from "./account.entity";
import { Stage } from "./stage.entity";

@Entity("component")
@Unique("component_name_parent_unique", ["name", "parent.id"])
@Index("component_parent_index", ["parent.id"])
export class Component {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "createdBy" })
  createdBy: Account;

  @ManyToOne(() => Component, (component) => component.children, {
    nullable: true,
  })
  @JoinColumn({ name: "parentId" })
  parent?: Component;

  @OneToMany(() => Component, (component) => component.parent)
  children: Component[];

  @OneToMany(() => Config, (config) => config.component)
  configs: Config[];
}
