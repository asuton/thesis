import {
  Column,
  BaseEntity,
  BeforeInsert,
  PrimaryColumn,
  AfterLoad,
  BeforeUpdate,
  AfterUpdate,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import { Authorization } from "../utils/constants";
import { hashPassword } from "../helpers/hash";
import { v4 as uuidv4 } from "uuid";
import { createSignature, verifySignature } from "../services/hmac";

export default abstract class User extends BaseEntity {
  @PrimaryColumn()
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

  @Column()
  authTag!: string;

  @BeforeInsert()
  async setIdPasswordAuthTag() {
    this.password = await hashPassword(this.password);
    this.id = uuidv4();
    this.webAuthnRegistered = false;
    const content =
      this.id + this.authorization + this.webAuthnRegistered.toString();

    this.authTag = createSignature(content).toString("base64");
  }
  @BeforeUpdate()
  updateAuthTag() {
    const content =
      this.id + this.authorization + this.webAuthnRegistered.toString();

    this.authTag = createSignature(content).toString("base64");
  }
}
