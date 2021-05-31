import { Column, Entity, OneToMany } from "typeorm";
import { Length, IsDateString } from "class-validator";
import User from "./User";
import MedicalRecord from "./MedicalRecord";
import DiagnosticTesting from "./DiagnosticTesting";
import Authenticator from "./Authenticator";
import Appointment from "./Appointment";

@Entity({ name: "patients" })
export default class Patient extends User {
  @Column()
  @IsDateString()
  dateOfBirth!: Date;

  @Column()
  @Length(1, 255)
  address!: string;

  @OneToMany(() => MedicalRecord, (medicalRecord) => medicalRecord.patient)
  medicalRecord!: MedicalRecord[];

  @OneToMany(
    () => DiagnosticTesting,
    (diagnosticTesting) => diagnosticTesting.patient
  )
  diagnosticTesting!: DiagnosticTesting[];

  @OneToMany(() => Authenticator, (authenticator) => authenticator.patient)
  authenticator!: Promise<Authenticator[]>;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  appointment!: Appointment[];
}
