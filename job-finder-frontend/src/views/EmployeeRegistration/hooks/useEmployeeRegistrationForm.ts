import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
  employeeRegistrationFormDefaults,
  employeeRegistrationSchema,
  EmployeeRegistrationSchemaType,
} from 'views/EmployeeRegistration/hooks/utils';

export const useEmployeeRegistrationForm = () => {
  const { control, handleSubmit, trigger, watch } = useForm<EmployeeRegistrationSchemaType>({
    resolver: zodResolver(employeeRegistrationSchema),
    defaultValues: employeeRegistrationFormDefaults,
  });

  const onSubmit = (data: EmployeeRegistrationSchemaType) => {
    console.log(data);
  };

  return { control, handleSubmit, onSubmit, trigger, watch };
};
