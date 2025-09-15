import { InputHTMLAttributes, ReactNode, Ref } from 'react';

import { VariantProps } from 'tailwind-variants';

import { Maybe } from 'common/types/types';
import { getInputStyles } from 'components/ui/Input/styles';

export type TextOnlyInputVariantProps = {
  sideElement?: undefined;
  sideElementPosition?: never;
  onClickSideElement?: never;
};

export type TextWithIconInputVariantProps = {
  sideElement: ReactNode;
  sideElementPosition: 'start' | 'end';
};

export type HTMLInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'readOnly'
  | 'disabled'
  | 'name'
  | 'onChange'
  | 'placeholder'
  | 'inputMode'
  | 'id'
  | 'maxLength'
  | 'autoCorrect'
  | 'autoCapitalize'
  | 'autoFocus'
  | 'max'
  | 'min'
  | 'step'
  | 'onBlur'
  | 'onPaste'
  | 'type'
  | 'accept'
  | 'value'
>;

type BaseProps = Omit<VariantProps<typeof getInputStyles>, 'error'> &
  HTMLInputProps & {
    label?: string;
    ref?: Ref<HTMLInputElement>;
    error?: Maybe<string | boolean>;
  };

export type InputProps = (TextOnlyInputVariantProps | TextWithIconInputVariantProps) & BaseProps;
