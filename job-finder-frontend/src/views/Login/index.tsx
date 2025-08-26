import { useState } from 'react';

import { Controller } from 'react-hook-form';

import { EyeOffIcon } from 'assets/Icons/EyeOffIcon';
import { EyeOnIcon } from 'assets/Icons/EyeOnIcon';
import { Input } from 'components/ui/Input';
import { useUserAuthenticationForm } from 'hooks/useUserAuthenticationForm/useUserAuthenticationForm';

const LOGIN_URL = 'auth/login';

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { control, mutationLoading, formErrors, isError, errorMessage, handleSubmit, onSubmit } =
    useUserAuthenticationForm({ route: LOGIN_URL });

  const { email: emailError, password: passwordError } = formErrors;

  const hasError = isError || Boolean(emailError || passwordError);

  return (
    <div>
      <div className="flex flex-col items-center gap-4 px-2">
        <h1 className="text-jf-header">Welcome Back!</h1>
        <p>New jobs are waiting—let’s go get ’em!</p>
      </div>

      <form onSubmit={handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-2 p-4">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              name="email"
              placeholder="email"
              label="Email"
              type="text"
              inputMode="email"
              error={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
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
              error={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <button
          disabled={mutationLoading}
          className="text-jf-geologica-white bg-jf-purple-700 flex h-10 w-full items-center justify-center rounded-lg"
        >
          login
        </button>

        {hasError && <span className="text-jf-rose-700 text-center text-xs">{errorMessage}</span>}
      </form>
    </div>
  );
};
