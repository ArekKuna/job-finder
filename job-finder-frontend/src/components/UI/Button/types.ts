import { ButtonHTMLAttributes, ReactNode } from 'react';

import { VariantProps } from 'tailwind-variants';

import { getButtonStyles } from 'components/ui/Button/styles';

export type BaseButtonProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'id' | 'type' | 'disabled' | 'onClick'
>;

export type TextButtonVariantProps = {
  text: string;
};

export type IconButtonVariantProps = {
  icon: ReactNode;
  /** aria-label is needed if there is no text param*/
  label: string;
};

export type ButtonProps = (TextButtonVariantProps | IconButtonVariantProps) & BaseButtonProps & ButtonVariants;


export type ButtonVariants = VariantProps<typeof getButtonStyles>;
