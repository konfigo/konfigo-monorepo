import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Component } from "./component.entity";
import { Account } from "./account.entity";

@Entity("config")
@Index("config_component_index", ["component.id"])
export class Config {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Component, (component) => component.configs, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "componentId" })
  component: Component;

  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "createdBy" })
  createdBy: Account;

  @CreateDateColumn()
  createdAt: Date;

  @Column("text", { default: "{}", nullable: false })
  payload: string;

  @Column("text", { default: "initial commit", nullable: false })
  commitMessage: string;

  @Column({ default: 0, nullable: false })
  revision: number;
}
