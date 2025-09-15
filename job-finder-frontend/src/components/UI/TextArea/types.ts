import { InputHTMLAttributes } from 'react';

import { VariantProps } from 'tailwind-variants';

import { getTextAreaStyles } from 'components/ui/TextArea/styles';

export type TextAreaProps = InputHTMLAttributes<HTMLTextAreaElement> &
  Omit<VariantProps<typeof getTextAreaStyles>, 'maxLength' | 'error'> & {
    label?: string;
    error?: string;
  };
