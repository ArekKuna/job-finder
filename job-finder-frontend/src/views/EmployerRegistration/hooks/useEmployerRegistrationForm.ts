import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { httpErrorMap } from 'common/errorMap/errorMap';
import { RegisterEmployerDto, UserAuthenticationResponseDto } from 'generated/api-types';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useCustomMutation } from 'hooks/useCustomMutation/useCustomMutation';
import { useToast } from 'hooks/useToast';
import {
  employerRegistrationFormDefaults,
  employerRegistrationSchema,
  EmployerRegistrationSchemaType,
} from 'views/EmployerRegistration/hooks/utils';

const EMPLOYER_REGISTRATION_ROUTE = 'users/register/employer';

export const useEmployerRegistrationForm = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const { mutateAsync, isPending: registerEmployerLoading } = useCustomMutation<
    UserAuthenticationResponseDto,
    RegisterEmployerDto
  >({
    route: EMPLOYER_REGISTRATION_ROUTE,
    method: 'POST',
    key: ['authStatus'],
  });

  const { control, handleSubmit, trigger, watch } = useForm<EmployerRegistrationSchemaType>({
    resolver: zodResolver(employerRegistrationSchema),
    defaultValues: employerRegistrationFormDefaults,
  });

  const navigate = useNavigate();

  const {
    toaster: { promise },
  } = useToast();

  const onSubmit = async (formData: EmployerRegistrationSchemaType) => {
    await promise(mutateAsync(formData), {
      error: (err: unknown) => {
        const error = err as Error;

        return httpErrorMap[error.message];
      },
      loading: 'Creating new profile...',
      success: () => {
        setAuthStatus('AUTHORIZED');

        navigate('/');

        return 'Profile created successfully!';
      },
    });
  };

  return { control, registerEmployerLoading, handleSubmit, onSubmit, trigger, watch };
};
