import { tv } from 'tailwind-variants';

export const getStyles = tv({
  base: 'h-fit border-none cursor-pointer font-label rounded-md disabled:-cursor-default focus-visible:outline-jf-blue-500 focus-visible:outline focus-visible:outline-4',
  variants: {
    variant: {
      primary:
        'text-white! bg-jf-blue-500 hover:bg-jf-blue-400 active:bg-jf-blue-600 disabled:bg-jf-warm-gray-300',
      secondary: '',
      ghost:
        'text-black bg-white hover:bg-jf-warm-gray-100 active:bg-jf-warm-gray-200 disabled:bg-jf-warm-gray-300',
      negative: '',
      secondaryNegative: '',
      ghostNegative: '',
    },
    size: {
      condensed: 'py-3 px-8',
      regular: 'py-3 px-4',
      large: 'py-4 px-6',
    },
    full: {
      true: 'w-full',
      false: 'w-fit',
    },
    loading: {
      true: 'text-transparent relative pointer-events-none select-none disabled:text-transparent',
    },
    onlyIcon: {
      true: 'aspect-square p-4',
    },
    iconPosition: {
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
    justify: {
      start: 'justify-start text-start',
      center: 'justify-center text-center',
      between: 'justify-between text-start',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'regular',
    iconPosition: 'left',
    full: true,
    justify: 'center',
  },
});
