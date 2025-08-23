import { getStyles } from "components/ui/Button/styles";
import { ButtonHTMLAttributes } from "react";
import { VariantProps } from "tailwind-variants";

export type BaseProps = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "id" | "type" | "disabled" | "onClick" | "title"
>;

export type ButtonVariants = VariantProps<typeof getStyles>;
