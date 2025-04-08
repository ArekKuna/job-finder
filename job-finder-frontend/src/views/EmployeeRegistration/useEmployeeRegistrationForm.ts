import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  employeeRegistrationSchema,
  employeeRegistrationSchemaType,
} from "views/EmployeeRegistration/utils";
import { useCustomMutation } from "hooks/useCustomMutation/useCustomMutation";
import { CreateUserResponseDto, UserDto } from "generated/api-types";
import { authStatusAtom } from "hooks/useAuthorization/authAtom";

export const useEmployeeRegistrationForm = () => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const url = "http://192.168.1.32:3000/users/employee/signup";

  const navigate = useNavigate();

  const {
    isPending: mutationLoading,
    isError,
    error: mutationError,
    mutateAsync,
  } = useCustomMutation<CreateUserResponseDto, UserDto>({
    url,
    method: "POST",
    key: ["authStatus"],
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

    setAuthStatus("AUTHORIZED");

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
