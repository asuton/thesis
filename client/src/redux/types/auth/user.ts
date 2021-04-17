import { PackRule } from "@casl/ability/extra";
import { RawRuleOf, ForcedSubject, Ability, AbilityClass } from "@casl/ability";

type Actions = "create" | "read" | "update" | "delete";
type Subjects = "Patient" | "Doctor" | "MedicalRecord";

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
}
