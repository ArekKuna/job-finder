import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { HireIcon } from 'assets/Icons/HireIcon';
import { PeopleIcon } from 'assets/Icons/PeopleIcon';
import { Button } from 'components/ui/Button';
import { Card } from 'components/ui/Card';

export const Register = () => {
  const [activeCard, setActiveCard] = useState<'employee' | 'employer' | null>(null);

  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-heading-1">Join JobFinder</h1>
          <p className="font-paragraph-1-muted">Choose your role to get started</p>
        </div>

        <div className="flex flex-col gap-8">
          <Card active={activeCard === 'employee'} onClick={() => setActiveCard('employee')}>
            <div className="flex justify-center">
              <PeopleIcon />
            </div>

            <div className="flex flex-col gap-4 text-center">
              <h1 className="font-heading-3">I'm looking for work</h1>
              <p className="font-paragraph-2-muted">
                Find your dream job, build your career, and connect with top employers
              </p>
            </div>

            <ul className="font-paragraph-3-muted space-y-2 text-left">
              <li>• Browse thousands of job opportunities</li>
              <li>• Create a professional profile</li>
              <li>• Get discovered by recruiters</li>
              <li>• Apply with one click</li>
            </ul>
          </Card>

          <Card active={activeCard === 'employer'} onClick={() => setActiveCard('employer')}>
            <div className="flex justify-center">
              <HireIcon />
            </div>

            <div className="flex flex-col gap-4 text-center">
              <h1 className="font-heading-3">I'm hiring talent</h1>
              <p className="font-paragraph-2-muted">
                Find the best candidates, post jobs, and build your dream team
              </p>
            </div>

            <ul className="font-paragraph-3-muted space-y-2 text-left">
              <li>• Post jobs and reach qualified candidates</li>
              <li>• Access powerful recruitment tools</li>
              <li>• Build your company profile</li>
              <li>• Manage applications efficiently</li>
            </ul>
          </Card>

          <div className="flex flex-col gap-8">
            {activeCard && (
              <Button
                text={`Continue as ${activeCard === 'employee' ? 'Job Seeker' : 'Employer'}`}
                onClick={() =>
                  navigate(
                    `/${activeCard === 'employee' ? 'employee-registration' : 'employer-registration'}`,
                  )
                }
              />
            )}

            <div className="text-center">
              <p className="font-paragraph-3-muted">
                Already have an account?
                <Link className="font-paragraph-3-primary font-medium! hover:underline" to="/login">
                  {' '}
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
