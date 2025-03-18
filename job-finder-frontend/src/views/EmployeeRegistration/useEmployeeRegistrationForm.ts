import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import {
  employeeRegistrationSchema,
  employeeRegistrationSchemaType,
} from "views/EmployeeRegistration/utils";
import { useCustomMutation } from "hooks/useCustomMutation/useCustomMutation";
import { useNavigate } from "react-router-dom";

export const useEmployeeRegistrationForm = () => {
  const url = "http://192.168.1.32:3000/users/employee/signup";

  const navigate = useNavigate();

  const {
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
    const response = await mutateAsync(formData);

    if (!response) {
      return;
    }
    const { jwtToken } = response;
    Cookies.set("JWT", jwtToken);

    return navigate("/");
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
