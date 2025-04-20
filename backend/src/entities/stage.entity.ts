import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Account } from "./account.entity";
import { Component } from "./component.entity";

@Entity("stage")
export class Stage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ default: "" })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Account, (account) => account.id, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "createdBy" })
  createdBy: Account;
}
