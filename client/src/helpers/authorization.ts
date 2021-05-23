import { Authorization, IAuth } from "../redux/types/auth/user";

export const checkAuthorizationNav = (user: IAuth) => {
  if (user.authorization === Authorization.Patient) {
    return `/patients/${user.id}`;
  } else if (user?.authorization === Authorization.Doctor) {
    return `/doctors/${user.id}`;
  } else {
    return "/login";
  }
};
