import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  BeforeInsert,
  AfterLoad,
} from "typeorm";
import { Length } from "class-validator";
import Patient from "./Patient";
import Doctor from "./Doctor";
import { encrypt, decrypt } from "../services/crypto";

@Entity({ name: "medicalRecords" })
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
  @Length(1, 500)
  medicalHistory!: string;

  @Column()
  @Length(1, 500)
  physicalExamination!: string;

  @Column()
  @Length(1, 500)
  diagnosis!: string;

  @Column()
  @Length(1, 500)
  treatment!: string;

  @Column()
  @Length(1, 500)
  recommendation!: string;

  @Column({ nullable: true })
  @Length(0, 500)
  additionalNote!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  encryptFields() {
    this.medicalHistory = encrypt(
      this.medicalHistory,
      this.patientId + this.doctorId + this.title
    );
    this.physicalExamination = encrypt(
      this.physicalExamination,
      this.patientId + this.doctorId + this.title
    );
    this.diagnosis = encrypt(
      this.diagnosis,
      this.patientId + this.doctorId + this.title
    );
    this.treatment = encrypt(
      this.treatment,
      this.patientId + this.doctorId + this.title
    );
    this.recommendation = encrypt(
      this.recommendation,
      this.patientId + this.doctorId + this.title
    );
    this.additionalNote = encrypt(
      this.additionalNote,
      this.patientId + this.doctorId + this.title
    );
  }

  @AfterLoad()
  decryptFields() {
    this.medicalHistory = decrypt(
      this.medicalHistory,
      this.patientId + this.doctorId + this.title
    );
    this.physicalExamination = decrypt(
      this.physicalExamination,
      this.patientId + this.doctorId + this.title
    );
    this.diagnosis = decrypt(
      this.diagnosis,
      this.patientId + this.doctorId + this.title
    );
    this.treatment = decrypt(
      this.treatment,
      this.patientId + this.doctorId + this.title
    );
    this.recommendation = decrypt(
      this.recommendation,
      this.patientId + this.doctorId + this.title
    );
    this.additionalNote = decrypt(
      this.additionalNote,
      this.patientId + this.doctorId + this.title
    );
  }
}
