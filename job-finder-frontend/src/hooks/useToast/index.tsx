import { Renderable, resolveValue, toast, ValueOrFunction } from 'react-hot-toast';

import { ToastConfig } from 'hooks/useToast/types';
import { renderToast, toastsClassMap } from 'hooks/useToast/utils';

export const useToast = () => {
  const toaster = {
    success: (message: string, options: ToastConfig = {}) =>
      toast.success(renderToast('success', message), {
        icon: null,
        className: toastsClassMap.success,
        ...options,
      }),

    error: (message: string, options: ToastConfig = {}) =>
      toast.error(renderToast('error', message), {
        icon: null,
        ...options,
        className: toastsClassMap.error,
      }),

    loading: (message: string, options: ToastConfig = {}) =>
      toast.loading(renderToast('loading', message), {
        icon: null,
        ...options,
        className: toastsClassMap.loading,
      }),

    warning: (message: string, options: ToastConfig = {}) =>
      toast(renderToast('warning', message), {
        icon: null,
        ...options,
        className: toastsClassMap.warning,
      }),

    promise: async <T,>(
      promise: Promise<T>,
      message: {
        loading: Renderable;
        success: ValueOrFunction<Renderable, T>;
        error: ValueOrFunction<Renderable, Error>;
      },
      options?: ToastConfig,
    ) => {
      const id = toaster.loading(message.loading as string, {
        ...options,
      });

      try {
        const p = await promise;

        toaster.success(resolveValue(message.success as string, p), {
          id,
          ...options,
        });

        return p;
      } catch (e) {
        toaster.error(resolveValue(message.error as string, e), {
          id,
          ...options,
        });

        return e;
      }
    },
  };

  return { toaster };
};
