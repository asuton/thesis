import { PackRule } from "@casl/ability/extra";
import { RawRuleOf, ForcedSubject, Ability, AbilityClass } from "@casl/ability";

export enum Authorization {
  Doctor = "DOCTOR",
  Patient = "PATIENT",
  Admin = "ADMIN",
}

type Actions = "create" | "read" | "update" | "delete";
type Subjects = "Patient" | "Doctor" | "MedicalRecord" | "DiagnosticTesting";

export type AppAbilities = [
  Actions,
  Subjects | ForcedSubject<Exclude<Subjects, "all">>
];

export type AppAbility = Ability<AppAbilities>;
const AppAbility = Ability as AbilityClass<AppAbility>;

export interface IAuth {
  id: string;
  rules: PackRule<RawRuleOf<AppAbility>>[];
  token: string;
  authorization: Authorization;
  webAuthnRegistered: boolean;
}
