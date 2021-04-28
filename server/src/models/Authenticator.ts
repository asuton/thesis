import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Patient from "./Patient";
import Doctor from "./Doctor";

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

  @ManyToOne(() => Patient, { nullable: true })
  @JoinColumn()
  patient!: Promise<Patient>;

  @ManyToOne(() => Doctor, { nullable: true })
  @JoinColumn()
  doctor!: Promise<Doctor>;
}
