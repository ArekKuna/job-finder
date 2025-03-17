import { Controller } from "react-hook-form";
import { Input } from "components/Input/Input";
import { useEmployeeRegistrationForm } from "views/EmployeeRegistration/useEmployeeRegistrationForm";
import { httpErrorFallback, httpErrorMap } from "common/error-map";

export const EmployeeRegistration = () => {
  const {
    control,
    formErrors,
    isError,
    mutationLoading,
    mutationError,
    handleSubmit,
    onSubmit,
  } = useEmployeeRegistrationForm();

  const { email: emailError, password: passwordError } = formErrors;

  const hasError = isError || Boolean(emailError || passwordError);
  const errorMessage =
    httpErrorMap[mutationError?.message ?? httpErrorFallback] ||
    emailError?.message ||
    passwordError?.message;

  return (
    <div>
      <div className="pt-4 px-2 flex flex-col gap-4">
        <h1 className="text-jf-header">Start Your Career Journey</h1>
        <span>
          Start your journey by creating an account to access exciting career
          opportunities.
        </span>
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
              type="password"
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

        {hasError && (
          <span className="text-center text-jf-rose-700 text-xs">
            {errorMessage}
          </span>
        )}
      </form>
    </div>
  );
};
