import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Authorization } from "../utils/constants";
import { IsEmail, Length } from "class-validator";
import Authenticator from "./Authenticator";

@Entity({ name: "admin" })
export default class Admin extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Length(1, 255)
  @IsEmail()
  email!: string;

  @Column()
  @Length(7, 255)
  password!: string;

  @Column({
    type: "enum",
    enum: Authorization,
    default: Authorization.Patient,
    readonly: true,
  })
  authorization!: Authorization;

  @Column({ default: false })
  webAuthnRegistered!: boolean;

  @OneToMany(() => Authenticator, (authenticator) => authenticator.doctor)
  authenticator!: Promise<Authenticator[]>;
}
