import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { MutationRequestMethod } from "hooks/useCustomMutation/types";
import { UserAuthenticationResponseDto } from "generated/api-types";

const isAuthResponse = (
  data: unknown
): data is UserAuthenticationResponseDto => {
  return typeof data === "object" && data !== null && "jwtToken" in data;
};

const fetchDataFn = async <TBody>(
  url: string,
  method: MutationRequestMethod,
  body: TBody
) => {
  const token = Cookies.get("JWT");

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.statusCode);
  }

  return response.json();
};

export const useCustomMutation = <TResponse, TBody>({
  url,
  method,
  key,
}: {
  url: string;
  method: MutationRequestMethod;
  key?: ReadonlyArray<unknown>;
}) => {
  const queryClient = useQueryClient();

  const { isPending, isError, error, mutateAsync } = useMutation<
    TResponse,
    Error,
    TBody
  >({
    mutationFn: async (body: TBody) => await fetchDataFn(url, method, body),
    onSuccess: async (data) => {
      if (isAuthResponse(data)) {
        const token = data.jwtToken as string;
        Cookies.set("JWT", token);
      }

      await queryClient.refetchQueries({
        queryKey: key,
      });
    },
  });

  return { isPending, isError, error, mutateAsync };
};
