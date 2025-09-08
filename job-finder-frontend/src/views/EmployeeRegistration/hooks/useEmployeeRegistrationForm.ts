import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { httpErrorMap } from 'common/errorMap/errorMap';
import { RegisterEmployeeDto, UserAuthenticationResponseDto } from 'generated/api-types';
import { authStatusAtom } from 'hooks/useAuthorization/authAtom';
import { useCustomMutation } from 'hooks/useCustomMutation/useCustomMutation';
import { useToast } from 'hooks/useToast';
import {
  employeeRegistrationFormDefaults,
  employeeRegistrationSchema,
  EmployeeRegistrationSchemaType,
} from 'views/EmployeeRegistration/hooks/utils';

const EMPLOYEE_REGISTRATION_ROUTE = 'users/register/employee';

export const useEmployeeRegistrationForm = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const { mutateAsync } = useCustomMutation<UserAuthenticationResponseDto, RegisterEmployeeDto>({
    route: EMPLOYEE_REGISTRATION_ROUTE,
    method: 'POST',
    key: ['authStatus'],
  });

  const { control, handleSubmit, trigger, watch } = useForm<EmployeeRegistrationSchemaType>({
    resolver: zodResolver(employeeRegistrationSchema),
    defaultValues: employeeRegistrationFormDefaults,
  });

  const navigate = useNavigate();

  const {
    toaster: { promise },
  } = useToast();

  const onSubmit = async (formData: EmployeeRegistrationSchemaType) => {
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

  return { control, handleSubmit, onSubmit, trigger, watch };
};
