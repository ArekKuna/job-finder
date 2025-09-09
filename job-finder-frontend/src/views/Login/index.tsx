import { useState } from 'react';

import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { BriefcaseIcon } from 'assets/Icons/BriefcaseIcon';
import { EyeOffIcon } from 'assets/Icons/EyeOffIcon';
import { EyeOnIcon } from 'assets/Icons/EyeOnIcon';
import { ButtonUI } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { InputUI } from 'components/ui/Input';
import { useUserLoginForm } from 'views/Login/hooks/useUserLoginForm';

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { control, userLoginLoading, handleSubmit, onSubmit } = useUserLoginForm();

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <Card>
        <div className="flex flex-col items-center gap-4">
          <BriefcaseIcon />
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="font-heading-2">Welcome Back</h1>
            <p className="font-paragraph-2-muted">Sign in to your JobFinder account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <InputUI
                  name="email"
                  placeholder="email"
                  label="Email"
                  type="email"
                  inputMode="email"
                  autoCapitalize="none"
                  value={value}
                  error={error?.message}
                  onChange={(e) => onChange(e.target.value.trim())}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <InputUI
                  name="password"
                  placeholder="password"
                  label="Password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  sideElement={
                    isPasswordVisible ? (
                      <div className="text-primary h-full w-full" onClick={handlePasswordIconClick}>
                        <EyeOffIcon />
                      </div>
                    ) : (
                      <div className="text-primary h-full w-full" onClick={handlePasswordIconClick}>
                        <EyeOnIcon />
                      </div>
                    )
                  }
                  sideElementPosition="end"
                  value={value}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-4">
            <Link
              className="font-paragraph-3-primary text-center hover:underline active:underline"
              to="/password-recovery"
            >
              <p>Forgot password?</p>
            </Link>
            <ButtonUI
              text="Sign In"
              loading={userLoginLoading}
              disabled={userLoginLoading}
              type="submit"
            />
          </div>
        </form>

        <div className="text-center">
          <p className="font-paragraph-3-muted">
            Don't have an account?
            <Link
              className="font-paragraph-3-primary font-medium! hover:underline active:underline"
              to="/register"
            >
              {' '}
              Create one here
            </Link>
          </p>
        </div>
      </Card>
    </section>
  );
};
