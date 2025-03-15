import { Controller } from "react-hook-form";
import { Input } from "components/Input/Input";
import { useEmployeeRegistrationForm } from "views/EmployeeRegistration/useEmployeeRegistrationForm";

export const EmployeeRegistration = () => {
  const { control, errors, handleSubmit, onSubmit } =
    useEmployeeRegistrationForm();

  const { email: emailError, password: passwordError } = errors;

  return (
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
            type="email"
            error={Boolean(emailError)}
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
            error={Boolean(passwordError)}
            value={value}
            onChange={onChange}
          />
        )}
      />
      <button className="w-full h-10 flex justify-center items-center rounded-lg text-jf-geologica-white bg-jf-purple-700">
        Register
      </button>

      {(emailError || passwordError) && (
        <span className="text-center text-jf-rose-700 text-xs">
          {emailError?.message || passwordError?.message}
        </span>
      )}
    </form>
  );
};
