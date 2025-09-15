import { tv } from 'tailwind-variants';

export const getButtonStyles = tv({
  base: 'border-none cursor-pointer font-label rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[disabled]:bg-muted-foreground/20 data-[disabled]:pointer-events-none',
  variants: {
    variant: {
      primary:
        'h-10 bg-primary font-label-white data-[hover]:bg-primary/90 data-[active]:bg-primary/90',
      ghost: 'h-10 bg-transparent font-label data-[hover]:bg-accent data-[active]:bg-accent',
    },
    full: {
      true: 'w-full',
      false: 'w-fit',
    },
    loading: {
      true: 'flex justify-center items-center',
    },
    size: {
      xs: 'px-2',
      md: 'px-4',
      lg: 'px-6',
      xl: 'px8',
    },
  },
  defaultVariants: {
    variant: 'primary',
    full: true,
    size: 'md',
  },
});

export const getButtonLoaderStyles = tv({
  base: 'w-6 h-6 animate-spin text-primary flex justify-center items-center',
});
