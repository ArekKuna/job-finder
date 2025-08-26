import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserAuthenticationResponseDto, UserCredentialsDto } from 'generated/api-types';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useCustomMutation } from 'hooks/useCustomMutation/useCustomMutation';
import {
  userAuthenticationSchema,
  userAuthenticationSchemaType,
} from 'hooks/useUserAuthenticationForm/utils';

const LOGIN_URL = 'auth/login';

export const useUserAuthenticationForm = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const navigate = useNavigate();

  const { mutateAsync } = useCustomMutation<UserAuthenticationResponseDto, UserCredentialsDto>({
    route: LOGIN_URL,
    method: 'POST',
    key: ['authStatus'],
  });

  const { control, handleSubmit } = useForm<userAuthenticationSchemaType>({
    resolver: zodResolver(userAuthenticationSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: userAuthenticationSchemaType) => {
    const response = await mutateAsync(formData);

    if (!response) {
      return;
    }

    setAuthStatus('AUTHORIZED');

    return navigate('/');
  };

  return {
    control,
    handleSubmit,
    onSubmit,
  };
};
