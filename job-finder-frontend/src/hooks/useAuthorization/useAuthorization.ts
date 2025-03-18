import { authStatusAtom } from "hooks/useAuthorization/authAtom";
import { useAtom } from "jotai";
import Cookies from "js-cookie";

export const useAuthorization = () => {
  const [, setAuthorizationStatus] = useAtom(authStatusAtom);

  const token = Cookies.get("JWT");

  if (token) {
    return setAuthorizationStatus("AUTHORIZED");
  }

  return setAuthorizationStatus("UNAUTHORIZED");
};

export const useLogout = () => {
  const [, setAuthorizationStatus] = useAtom(authStatusAtom);

  const logout = () => {
    Cookies.remove("JWT");
    Cookies.remove("RT");
    setAuthorizationStatus("UNAUTHORIZED");
  };

  return logout;
};
