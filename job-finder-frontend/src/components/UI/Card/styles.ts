import { tv } from 'tailwind-variants';

export const getCardStyles = tv({
  base: 'bg-background text-foreground flex flex-col gap-6 rounded-lg border px-4 py-6 shadow-md',
  variants: {
    isActive: {
      true: 'ring-primary ring-2',
    },
    isInteractive: {
      true: 'cursor-pointer hover:shadow-lg',
    },
  },
});
