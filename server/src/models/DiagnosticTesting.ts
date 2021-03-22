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

@Entity({ name: "diagnosticTesting" })
export default class DiagnosticTesting extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Doctor, (doctor) => doctor)
  @JoinColumn()
  doctor!: Doctor;

  @ManyToOne(() => Patient, (patient) => patient)
  patient!: Patient;

  @Column({ type: "varchar", length: 50 })
  test!: string;

  @Column({ type: "text" })
  result!: string;
}
