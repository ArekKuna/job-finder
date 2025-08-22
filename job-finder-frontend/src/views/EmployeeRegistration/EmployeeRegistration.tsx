import { useState } from "react";
import { Controller } from "react-hook-form";
import { EyeOffIcon } from "assets/Icons/EyeOffIcon";
import { EyeOnIcon } from "assets/Icons/EyeOnIcon";
import { useUserAuthenticationForm } from "hooks/useUserAuthenticationForm/useUserAuthenticationForm";
import { Input } from "components/ui/Input/Input";

const SIGNUP_URL = "users/employee/signup";

export const EmployeeRegistration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const {
    control,
    mutationLoading,
    formErrors,
    isError,
    errorMessage,
    handleSubmit,
    onSubmit,
  } = useUserAuthenticationForm({ route: SIGNUP_URL });

  const { email: emailError, password: passwordError } = formErrors;

  const formHasError = isError || Boolean(emailError || passwordError);

  return (
    <div>
      <div className="pt-4 px-2 flex flex-col gap-4">
        <h1 className="text-jf-header">Start Your Career Journey</h1>
        <p>
          Start your journey by creating an account to access exciting career
          opportunities.
        </p>
      </div>

      <form
        onSubmit={handleSubmit((data) => onSubmit(data))}
        className="p-4 flex flex-col gap-2"
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              name="email"
              placeholder="email"
              label="Email"
              border="primary"
              type="text"
              inputMode="email"
              error={Boolean(emailError?.message) || isError ? true : undefined}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              name="password"
              placeholder="password"
              label="Password"
              border="primary"
              type={isPasswordVisible ? "text" : "password"}
              sideElement={
                isPasswordVisible ? (
                  <EyeOffIcon onClick={handlePasswordIconClick} />
                ) : (
                  <EyeOnIcon onClick={handlePasswordIconClick} />
                )
              }
              sideElementPosition="end"
              error={
                Boolean(passwordError?.message) || isError ? true : undefined
              }
              value={value}
              onChange={onChange}
            />
          )}
        />
        <button
          disabled={mutationLoading}
          className="w-full h-10 flex justify-center items-center rounded-lg text-jf-geologica-white bg-jf-purple-700"
        >
          Register
        </button>

        {formHasError && (
          <span className="text-center text-jf-rose-700 text-xs">
            {errorMessage}
          </span>
        )}
      </form>
    </div>
  );
};
