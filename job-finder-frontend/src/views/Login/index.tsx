import { useState } from 'react';

import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { BriefcaseIcon } from 'assets/Icons/BriefcaseIcon';
import { EyeOffIcon } from 'assets/Icons/EyeOffIcon';
import { EyeOnIcon } from 'assets/Icons/EyeOnIcon';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { Input } from 'components/ui/Input';
import { useUserAuthenticationForm } from 'views/Login/hooks/useUserAuthenticationForm';

export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { control, handleSubmit, onSubmit } = useUserAuthenticationForm();

  return (
    <div className="px-6 py-14">
      <section>
        <Card>
          <div className="flex flex-col items-center gap-4">
            <BriefcaseIcon />
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="font-heading-2">Welcome Back</h1>
              <p className="font-paragraph-2-muted">Sign in to your JobFinder account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit((data) => onSubmit(data))} className="flex flex-col gap-4">
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
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
                <Input
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

            <Link to="/password-recovery">
              <p className="font-paragraph-3-primary text-center hover:underline">
                Forgot password?
              </p>
            </Link>

            <Button text="Sign In" />

            <div className="text-center">
              <p className="font-paragraph-3-muted">
                Don't have an account?
                <Link
                  className="font-paragraph-3-primary font-medium! hover:underline"
                  to="/get-started"
                >
                  {' '}
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
};
