import { RawRuleOf } from "@casl/ability";
import { unpackRules } from "@casl/ability/extra";
import { Ability, ForcedSubject, AbilityClass } from "@casl/ability";
import { IAuth } from "../redux/types/auth/user";

type Actions = "create" | "read" | "update" | "delete";
type Subjects =
  | "Patient"
  | "Doctor"
  | "MedicalRecord"
  | "DiagnosticTesting"
  | "Appointment";

type AppAbilities = [
  Actions,
  Subjects | ForcedSubject<Exclude<Subjects, "all">>
];

type AppAbility = Ability<AppAbilities>;
const AppAbility = Ability as AbilityClass<AppAbility>;

const createAbility = (rules: RawRuleOf<AppAbility>[]) =>
  new Ability<AppAbilities>(rules);

let user: IAuth | null = null;
let unpackedRules: RawRuleOf<AppAbility>[] = [];
const storage: string | null = localStorage.getItem("user");
if (storage) {
  user = JSON.parse(storage) as IAuth;
  const { rules } = user;
  unpackedRules = unpackRules(rules);
}

export const ability = createAbility(unpackedRules);
