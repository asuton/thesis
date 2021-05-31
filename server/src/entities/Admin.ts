import { Entity, OneToMany, BeforeInsert } from "typeorm";
import { Authorization } from "../utils/constants";
import Authenticator from "./Authenticator";
import User from "./User";

@Entity({ name: "admin" })
export default class Admin extends User {
  @OneToMany(() => Authenticator, (authenticator) => authenticator.admin)
  authenticator!: Promise<Authenticator[]>;

  @BeforeInsert()
  setAuthorization() {
    this.authorization = Authorization.Admin;
  }
}
