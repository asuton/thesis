import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import Patient from "./Patient";
import Doctor from "./Doctor";

@Entity({ name: "appointment" })
export default class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor)
  @JoinColumn()
  doctor!: Doctor;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient!: Patient;

  @Column()
  doctorId!: string;

  @Column()
  patientId!: string;

  @Column("time")
  time!: Date;

  @Column("date")
  date!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
