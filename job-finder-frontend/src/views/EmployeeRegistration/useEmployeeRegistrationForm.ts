import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import {
  employeeRegistrationSchema,
  employeeRegistrationSchemaType,
} from "views/EmployeeRegistration/utils";
import { useCustomMutation } from "hooks/useCustomMutation";

export const useEmployeeRegistrationForm = () => {
  const url = "http://localhost:3000/users/employee/signup";

  const {
    data,
    isPending: mutationLoading,
    isError,
    error: mutationError,
    mutateAsync,
  } = useCustomMutation<{ jwtToken: string }, employeeRegistrationSchemaType>({
    url,
    method: "POST",
  });

  const {
    control,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<employeeRegistrationSchemaType>({
    resolver: zodResolver(employeeRegistrationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: employeeRegistrationSchemaType) => {
    await mutateAsync(formData);

    if (!data) {
      return;
    }

    const { jwtToken } = data;
    Cookies.set("JWT", jwtToken);
  };

  return {
    control,
    formErrors,
    mutationLoading,
    isError,
    mutationError,
    handleSubmit,
    onSubmit,
  };
};
