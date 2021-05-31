import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import { Authorization } from "../utils/constants";
import { hashPassword } from "../helpers/hash";

export default abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  @Length(1, 255)
  name!: string;

  @Column()
  @Length(1, 255)
  surname!: string;

  @Column()
  @Length(11, 11)
  OIB!: string;

  @Column()
  @Length(7, 30)
  phone!: string;

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

  @BeforeInsert()
  async setPassword() {
    this.password = await hashPassword(this.password);
  }
}
