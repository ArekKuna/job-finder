import { AuthUserResponseDto } from "generated/api-types";
import { authStatusAtom } from "hooks/useAuthorization/authAtom";
import { useCustomQuery } from "hooks/useCustomQuery/useCustomQuery";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useCallback, useEffect, useRef } from "react";

export const useCheckAuthStatus = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);
  const hasRun = useRef(false);

  const token = Cookies.get("JWT");

  const url = "http://192.168.1.32:3000/auth/authorize";

  const { refetch } = useCustomQuery<AuthUserResponseDto>(url, Boolean(token), [
    "authStatus",
  ]);

  const authorizeUser = useCallback(async () => {
    hasRun.current = true;
    const { data } = await refetch();
    setAuthStatus(data ? "AUTHORIZED" : "UNAUTHORIZED");
  }, [refetch, setAuthStatus]);

  useEffect(() => {
    if (!hasRun.current) {
      authorizeUser();
    }
  }, [authorizeUser]);
};

export const useLogout = () => {
  const [, setAuthorizationStatus] = useAtom(authStatusAtom);

  const logout = () => {
    Cookies.remove("JWT");
    setAuthorizationStatus("UNAUTHORIZED");
  };

  return logout;
};
