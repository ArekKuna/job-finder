import { useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { EyeOffIcon } from 'assets/Icons/EyeOffIcon';
import { EyeOnIcon } from 'assets/Icons/EyeOnIcon';
import { HireIcon } from 'assets/Icons/HireIcon';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';
import { Input } from 'components/ui/Input';
import { useEmployerRegistrationForm } from 'views/EmployerRegistration/hooks/useEmployerRegistrationForm';

export const EmployerRegistration = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const handlePasswordIconClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleConfirmPasswordIconClick = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const { control, handleSubmit, onSubmit, trigger, watch } = useEmployerRegistrationForm();

  const { confirmPassword, password } = watch();

  useEffect(() => {
    if (password && confirmPassword) {
      trigger(['password', 'confirmPassword']);
    }
  }, [confirmPassword, password, trigger]);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <Card>
        <div className="flex justify-center">
          <HireIcon />
        </div>

        <div className="flex flex-col gap-2 text-center">
          <h1 className="font-heading-2">Create Company Account</h1>
          <p className="font-paragraph-2-muted">
            Start hiring the best talent for your organization
          </p>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <h2 className="font-heading-4">Personal information</h2>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="firstName"
                  placeholder="first name"
                  label="First name*"
                  type="text"
                  inputMode="text"
                  value={value}
                  error={error?.message}
                  onChange={(e) => onChange(e.target.value.trim())}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="lastName"
                  placeholder="last name"
                  label="Last name*"
                  type="text"
                  inputMode="text"
                  value={value}
                  error={error?.message}
                  onChange={(e) => onChange(e.target.value.trim())}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="email"
                  placeholder="business email address"
                  label="Business email address*"
                  type="text"
                  inputMode="email"
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
                  label="Password*"
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
                  onChange={(e) => {
                    onChange(e.target.value.trim());
                    trigger('password');
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="confirmPassword"
                  placeholder="password"
                  label="Confirm password*"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  sideElement={
                    isConfirmPasswordVisible ? (
                      <div
                        className="text-primary h-full w-full"
                        onClick={handleConfirmPasswordIconClick}
                      >
                        <EyeOffIcon />
                      </div>
                    ) : (
                      <div
                        className="text-primary h-full w-full"
                        onClick={handleConfirmPasswordIconClick}
                      >
                        <EyeOnIcon />
                      </div>
                    )
                  }
                  sideElementPosition="end"
                  value={value}
                  error={error?.message}
                  onChange={(e) => {
                    onChange(e.target.value.trim());
                    trigger('confirmPassword');
                  }}
                />
              )}
            />

            <h2 className="font-heading-4">Company Information</h2>

            <Controller
              name="companyName"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="companyName"
                  placeholder="company name"
                  label="Company name*"
                  type="text"
                  inputMode="text"
                  value={value ?? ''}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="companySize"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1">
                  <label htmlFor="companySize" className="font-label">
                    Company Size
                  </label>
                  <select
                    id="companySize"
                    name="companySize"
                    value={value ?? ''}
                    onChange={onChange}
                    className="h-10 rounded-md border"
                  >
                    <option value="">-- Select a company size --</option>
                    <option value="MIKRO">Mikro</option>
                    <option value="SMALL">Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                    <option value="EXTRA_LARGE">Extra Large</option>
                    <option value="CORPORATE">Corporate</option>
                  </select>
                  {error && <p className="font-error">{error.message}</p>}
                </div>
              )}
            />

            <Controller
              name="industry"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="industry"
                  placeholder="industry"
                  label="Industry*"
                  type="text"
                  inputMode="text"
                  value={value ?? ''}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="companyWebsite"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="companyWebsite"
                  placeholder="www.example.com"
                  label="Company website*"
                  type="text"
                  inputMode="text"
                  value={value ?? ''}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="phoneNumber"
                  placeholder="phone number"
                  label="Phone number*"
                  type="number"
                  inputMode="tel"
                  value={value}
                  error={error?.message}
                  onChange={(e) => onChange(e.target.value.trim())}
                />
              )}
            />

            <Controller
              name="location"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Input
                  name="location"
                  placeholder="city, state, country"
                  label="Location*"
                  type="text"
                  inputMode="text"
                  value={value}
                  error={error?.message}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="flex flex-col gap-1">
                  <label htmlFor="description" className="font-label">
                    Bio
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="tell us about your comapny, culture, and what makes it special..."
                    value={value ?? ''}
                    onChange={onChange}
                    className="rounded-md border"
                  />
                  {error && <p className="font-error">{error.message}</p>}
                </div>
              )}
            />
          </div>

          <Button text="Create Company Account" />
        </form>

        <div className="text-center">
          <p className="font-paragraph-3-muted">
            Already have an account?
            <Link className="font-paragraph-3-primary font-medium! hover:underline" to="/login">
              {' '}
              Sign in here
            </Link>
          </p>
        </div>
      </Card>
    </section>
  );
};
