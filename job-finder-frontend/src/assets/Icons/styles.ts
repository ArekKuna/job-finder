import { tv, VariantProps } from "tailwind-variants";

export const getIconStyles = tv({
  base: "",
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type IconStylesProps = VariantProps<typeof getIconStyles>;
