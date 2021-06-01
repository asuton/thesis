import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  AfterUpdate,
  AfterLoad,
} from "typeorm";
import { createSignature, verifySignature } from "../services/hmac";
import Admin from "./Admin";
import Doctor from "./Doctor";
import Patient from "./Patient";

@Entity({ name: "authenticator" })
export default class Authenticator extends BaseEntity {
  @Column()
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fmt!: string;

  @Column()
  pubKey!: string;

  @Column()
  counter!: number;

  @Column()
  credId!: string;

  @ManyToOne(() => Patient, (admin) => admin.authenticator, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  patient!: Promise<Patient>;

  @ManyToOne(() => Doctor, (doctor) => doctor.authenticator, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  doctor!: Promise<Doctor>;

  @ManyToOne(() => Admin, (admin) => admin.authenticator, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  admin!: Promise<Admin>;

  @Column({ nullable: true })
  authTag!: string;
}
