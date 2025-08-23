import { tv } from "tailwind-variants";

export const getStyles = tv({
  base: "h-fit border-none cursor-pointer font-label rounded-md disabled:-cursor-default focus-visible:outline-jf-blue-500 focus-visible:outline focus-visible:outline-4",
  variants: {
    variant: {
      primary:
        "text-white! bg-jf-blue-500 hover:bg-jf-blue-400 active:bg-jf-blue-600 disabled:bg-jf-warm-gray-300",
      secondary: "",
      ghost:
        "text-black! bg-white hover:bg-jf-warm-gray-100 active:bg-jf-warm-gray-200 disabled:bg-jf-warm-gray-300",
      negative: "",
      secondaryNegative: "",
      ghostNegative: "",
    },
    size: {
      condensed: "py-3 px-8",
      regular: "py-3 px-4",
      large: "py-4 px-6",
    },
    full: {
      true: "w-full",
      false: "w-fit",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "regular",
    full: true,
  },
});
