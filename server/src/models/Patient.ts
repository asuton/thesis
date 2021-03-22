import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import User from "./User";
import MedicalRecord from "./MedicalRecord";
import DiagnosticTesting from "./DiagnosticTesting";

@Entity({ name: "patients" })
export default class Patient extends User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "date" })
  dateOfBirth!: Date;

  @Column({ type: "varchar", length: 50 })
  address!: string;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecord!: MedicalRecord[];

  @OneToMany(
    () => DiagnosticTesting,
    (diagnosticTesting) => diagnosticTesting.patient
  )
  diagnosticTesting!: DiagnosticTesting[];
}
