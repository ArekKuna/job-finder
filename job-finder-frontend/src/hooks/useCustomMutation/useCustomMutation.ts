import { useMutation, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { UserAuthenticationResponseDto } from 'generated/api-types';
import { MutationRequestMethod } from 'hooks/useCustomMutation/types';

const BASE_URL = import.meta.env.VITE_API_URL;

const isAuthResponse = (data: unknown): data is UserAuthenticationResponseDto => {
  return typeof data === 'object' && data !== null && 'jwtToken' in data;
};

const fetchDataFn = async <TBody>(url: string, method: MutationRequestMethod, body: TBody) => {
  const token = Cookies.get('JWT');

  const isFormData = body instanceof FormData;

  const options: RequestInit = {
    method,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : ''),
    },
    body: isFormData ? (body as FormData) : JSON.stringify(body),
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.statusCode);
  }

  return response.json();
};

export const useCustomMutation = <TResponse, TBody>({
  route,
  method,
  key,
}: {
  route: string;
  method: MutationRequestMethod;
  key?: ReadonlyArray<unknown>;
}) => {
  const queryClient = useQueryClient();

  const url = `${BASE_URL}/${route}`;

  const { isPending, isError, error, mutateAsync } = useMutation<TResponse, Error, TBody>({
    mutationFn: async (body: TBody) => await fetchDataFn(url, method, body),
    onSuccess: async (data) => {
      if (isAuthResponse(data)) {
        const token = data.jwtToken as string;
        Cookies.set('JWT', token);
      }

      await queryClient.refetchQueries({
        queryKey: key,
      });
    },
  });

  return { isPending, isError, error, mutateAsync };
};
