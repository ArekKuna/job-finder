import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  employeeRegistrationSchema,
  employeeRegistrationSchemaType,
} from "views/EmployeeRegistration/utils";

export const useEmployeeRegistrationForm = () => {
  const {
    control,
    formState: { errors },
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
    console.log(formData);
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  };
};
