import { tv } from 'tailwind-variants';

export const getInputStyles = tv({
  base: 'w-full border flex flex-col justify-center items-center rounded-md py-2 px-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-foreground/10 placeholder-font',
  variants: {
    variant: {
      primary: 'h-10 ',
      secondary: 'h-[50px]',
    },
    sideElementPosition: {
      start: 'pl-11',
      end: 'pr-11',
    },
    error: {
      true: 'border-negative',
    },
  },
  defaultVariants: {
    variant: 'primary',
    hasSideElement: false,
    sideElementPosition: 'end',
    error: false,
  },
});
