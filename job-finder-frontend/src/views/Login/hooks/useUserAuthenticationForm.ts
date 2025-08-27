import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { httpErrorMap } from 'common/errorMap/errorMap';
import { UserAuthenticationResponseDto, UserCredentialsDto } from 'generated/api-types';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useCustomMutation } from 'hooks/useCustomMutation/useCustomMutation';
import { useToast } from 'hooks/useToast';
import { userAuthenticationSchema, userAuthenticationSchemaType } from 'views/Login/hooks/utils';

const LOGIN_URL = 'auth/login';

export const useUserAuthenticationForm = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const navigate = useNavigate();
  const {
    toaster: { promise },
  } = useToast();

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
    await promise(mutateAsync(formData), {
      error: (err: unknown) => {
        const error = err as Error;

        return httpErrorMap[error.message ?? 'Failed to fetch'];
      },
      loading: 'Signing in',
      success: () => {
        setAuthStatus('AUTHORIZED');

        navigate('/');

        return 'Welcome again';
      },
    });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
  };
};
