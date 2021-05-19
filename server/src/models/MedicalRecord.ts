import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  AfterLoad,
  BeforeUpdate,
  AfterUpdate,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";
import { encrypt, decrypt } from "../services/encryption";

@Entity({ name: "medical_record" })
export default class MedicalRecord extends BaseEntity {
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
  title!: string;

  @Column()
  @Length(1, 1024)
  medicalHistory!: string;

  @Column()
  @Length(1, 1024)
  physicalExamination!: string;

  @Column()
  @Length(1, 1024)
  diagnosis!: string;

  @Column()
  @Length(1, 1024)
  treatment!: string;

  @Column()
  @Length(1, 1024)
  recommendation!: string;

  @Column({ nullable: true })
  @Length(0, 1024)
  additionalNote!: string;

  @Column({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  encryptFields() {
    this.createdAt = new Date();

    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.title = encrypt(this.title, AAD);
    this.medicalHistory = encrypt(this.medicalHistory, AAD);
    this.physicalExamination = encrypt(this.physicalExamination, AAD);
    this.diagnosis = encrypt(this.diagnosis, AAD);
    this.treatment = encrypt(this.treatment, AAD);
    this.recommendation = encrypt(this.recommendation, AAD);
    this.additionalNote = encrypt(this.additionalNote, AAD);
  }

  @AfterLoad()
  decryptFields() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.title = decrypt(this.title, AAD);
    this.medicalHistory = decrypt(this.medicalHistory, AAD);
    this.physicalExamination = decrypt(this.physicalExamination, AAD);
    this.diagnosis = decrypt(this.diagnosis, AAD);
    this.treatment = decrypt(this.treatment, AAD);
    this.recommendation = decrypt(this.recommendation, AAD);
    this.additionalNote = decrypt(this.additionalNote, AAD);
  }

  @BeforeUpdate()
  encryptUpdate() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.additionalNote = encrypt(this.additionalNote, AAD);
  }
  @AfterUpdate()
  decryptUpdate() {
    let AAD = this.patientId + this.doctorId + String(this.createdAt);

    this.additionalNote = decrypt(this.additionalNote, AAD);
  }
}
