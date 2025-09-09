import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { httpErrorMap } from 'common/errorMap/errorMap';
import { UserAuthenticationResponseDto, UserCredentialsDto } from 'generated/api-types';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useCustomMutation } from 'hooks/useCustomMutation/useCustomMutation';
import { useToast } from 'hooks/useToast';
import { userLoginSchema, UserLoginSchemaType } from 'views/Login/hooks/utils';

const LOGIN_URL = 'auth/login';

export const useUserLoginForm = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const { mutateAsync, isPending: userLoginLoading } = useCustomMutation<
    UserAuthenticationResponseDto,
    UserCredentialsDto
  >({
    route: LOGIN_URL,
    method: 'POST',
    key: ['authStatus'],
  });

  const navigate = useNavigate();

  const {
    toaster: { promise },
  } = useToast();

  const { control, handleSubmit } = useForm<UserLoginSchemaType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: UserLoginSchemaType) => {
    await promise(mutateAsync(formData), {
      error: (err: unknown) => {
        const error = err as Error;

        return httpErrorMap[error.message];
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
    userLoginLoading,
    handleSubmit,
    onSubmit,
  };
};
