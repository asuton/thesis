import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";

@Entity({ name: "diagnosticTestings" })
export default class DiagnosticTesting extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor)
  doctor!: Doctor;

  @ManyToOne(() => Patient, (patient) => patient)
  patient!: Patient;

  @Column()
  @Length(1, 255)
  test!: string;

  @Column()
  @Length(1, 500)
  result!: string;
}
