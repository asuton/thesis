import { Column } from "typeorm";

export default abstract class User {
  @Column({ type: "varchar", length: 25 })
  name!: string;

  @Column({ type: "varchar", length: 25 })
  surname!: string;

  @Column({ type: "numeric", precision: 11 })
  OIB!: number;

  @Column({ type: "varchar", length: 15 })
  phone!: string;

  @Column({ type: "varchar", length: 75 })
  email!: string;

  @Column()
  password!: string;
}
