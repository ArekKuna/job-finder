import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

const fetchDataFn = async <TResponse>(
  url: string,
  params?: Record<string, string>
): Promise<TResponse> => {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = queryString ? `${url}?${queryString}` : url;

  const token = Cookies.get("JWT");

  const options: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  const response = await fetch(fullUrl, options);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.statusCode);
  }
  return response.json();
};

export const useCustomQuery = <TResponse>(
  url: string,
  enabled: boolean,
  key: string[],
  params?: Record<string, string>
) => {
  return useQuery<TResponse>({
    enabled: enabled,
    queryKey: key,
    queryFn: () => fetchDataFn(url, params || {}),
  });
};
