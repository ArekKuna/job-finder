import { useState } from 'react';

import { Controller } from 'react-hook-form';

import { EyeOffIcon } from 'assets/Icons/EyeOffIcon';
import { EyeOnIcon } from 'assets/Icons/EyeOnIcon';
import { Input } from 'components/ui/Input';
import { useUserAuthenticationForm } from 'views/Login/hooks/useUserAuthenticationForm';

const SIGNUP_URL = 'users/employee/signup';

export const EmployeeRegistration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { control, mutationLoading, formErrors, isError, errorMessage, handleSubmit, onSubmit } =
    useUserAuthenticationForm({ route: SIGNUP_URL });

  const { email: emailError, password: passwordError } = formErrors;

  const formHasError = isError || Boolean(emailError || passwordError);

  return (
    <div>
      <div className="flex flex-col gap-4 px-2 pt-4">
        <h1 className="text-jf-header">Start Your Career Journey</h1>
        <p>Start your journey by creating an account to access exciting career opportunities.</p>
      </div>

      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-2 p-4">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input
              name="email"
              placeholder="email"
              label="Email"
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
              type={isPasswordVisible ? 'text' : 'password'}
              sideElement={
                isPasswordVisible ? (
                  <div onClick={handlePasswordIconClick}>
                    <EyeOffIcon />
                  </div>
                ) : (
                  <div onClick={handlePasswordIconClick}>
                    <EyeOnIcon />
                  </div>
                )
              }
              sideElementPosition="end"
              error={Boolean(passwordError?.message) || isError ? true : undefined}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <button
          disabled={mutationLoading}
          className="text-jf-geologica-white bg-jf-purple-700 flex h-10 w-full items-center justify-center rounded-lg"
        >
          Register
        </button>

        {formHasError && (
          <span className="text-jf-rose-700 text-center text-xs">{errorMessage}</span>
        )}
      </form>
    </div>
  );
};
