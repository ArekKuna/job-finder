import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import {
  userAuthenticationSchema,
  userAuthenticationSchemaType,
} from "hooks/useUserAuthenticationForm/utils";
import { useCustomMutation } from "hooks/useCustomMutation/useCustomMutation";
import { authStatusAtom } from "hooks/useAuthorization/authAtom";
import {
  UserAuthenticationResponseDto,
  UserCredentialsDto,
} from "generated/api-types";
import { httpErrorFallback, httpErrorMap } from "common/errorMap/errorMap";

type Props = {
  url: string;
};

export const useUserAuthenticationForm = ({ url }: Props) => {
  const [, setAuthStatus] = useAtom(authStatusAtom);

  const navigate = useNavigate();

  const {
    isPending: mutationLoading,
    isError,
    error: mutationError,
    mutateAsync,
  } = useCustomMutation<UserAuthenticationResponseDto, UserCredentialsDto>({
    url,
    method: "POST",
    key: ["authStatus"],
  });

  const {
    control,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<userAuthenticationSchemaType>({
    resolver: zodResolver(userAuthenticationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { email: emailError, password: passwordError } = formErrors;

  const errorMessage =
    httpErrorMap[mutationError?.message ?? httpErrorFallback] ||
    emailError?.message ||
    passwordError?.message;

  const onSubmit = async (formData: userAuthenticationSchemaType) => {
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
    errorMessage,
    handleSubmit,
    onSubmit,
  };
};
