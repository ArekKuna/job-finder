import { ButtonHTMLAttributes, ReactNode } from 'react';

import { VariantProps } from 'tailwind-variants';

import { getStyles } from 'components/ui/Button/styles';

export type BaseProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'id' | 'type' | 'disabled' | 'onClick'
>;

export type TextVariantProps = {
  text: string;
};

export type IconVariantProps = {
  icon: ReactNode;
  /** aria-label is needed if there is no text param*/
  label: string;
};

export type TextWithIconVariantProps = {
  text: string;
  icon: ReactNode;
};

export type ButtonVariants = Omit<VariantProps<typeof getStyles>, 'onlyIcon'>;
