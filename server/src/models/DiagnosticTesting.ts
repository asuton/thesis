import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  AfterLoad,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";
import { encrypt, decrypt } from "../services/encryption";

@Entity({ name: "diagnosticTestings" })
export default class DiagnosticTesting extends BaseEntity {
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

  @Column()
  @Length(1, 255)
  test!: string;

  @Column()
  @Length(1, 500)
  result!: string;

  @Column({ type: "timestamp" })
  createdAt!: Date;

  @BeforeInsert()
  encryptFields() {
    this.createdAt = new Date();

    let AAD = this.id + this.patientId + this.doctorId + String(this.createdAt);

    this.test = encrypt(this.test, AAD);
    this.result = encrypt(this.result, AAD);
  }

  @AfterLoad()
  decryptFields() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.test = decrypt(this.test, AAD);
    this.result = decrypt(this.result, AAD);
  }
}
