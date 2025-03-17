import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { MutationRequestMethod } from "hooks/types";

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
  key?: ReadonlyArray<string>;
}) => {
  const queryClient = useQueryClient();

  const { data, isPending, isError, error, mutateAsync } = useMutation<
    TResponse,
    Error,
    TBody
  >({
    mutationFn: async (body: TBody) =>
      (await fetchDataFn(url, method, body)) as TResponse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { data, isPending, isError, error, mutateAsync };
};
