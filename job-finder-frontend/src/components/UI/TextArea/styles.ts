import { tv } from 'tailwind-variants';

export const getTextAreaStyles = tv({
  base: 'w-full border rounded-md py-2 px-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:bg-foreground/10 placeholder-font',
  variants: {
    maxLength: {
      true: 'min-h-80 max-h-[500px] pb-6',
      false: 'min-h-60 max-h-[500px] pb-6',
    },
    isResizable: {
      true: 'resize-none md:resize-y',
      false: 'resize-none',
    },
    error: {
      true: 'border-negative',
    },
  },
  defaultVariants: {
    maxLength: false,
    isResizable: true,
    error: false,
  },
});
