import { InputHTMLAttributes, ReactNode } from "react";

export type TextOnlyVariantProps = {
  sideElement?: undefined;
  sideElementPosition?: never;
  onClickSideElement?: never;
};

export type TextWithIconVariantProps = {
  sideElement: ReactNode;
  sideElementPosition: "start" | "end";
};

export type HTMLInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | "readOnly"
  | "disabled"
  | "name"
  | "onChange"
  | "placeholder"
  | "inputMode"
  | "id"
  | "maxLength"
  | "autoCorrect"
  | "autoCapitalize"
  | "autoFocus"
  | "max"
  | "min"
  | "step"
  | "onBlur"
  | "onPaste"
  | "type"
>;
