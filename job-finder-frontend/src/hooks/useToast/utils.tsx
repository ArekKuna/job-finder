import toast from 'react-hot-toast';

import { CircleAlertIcon } from 'assets/Icons/CircleAlertIcon';
import { CircleCheckIcon } from 'assets/Icons/CircleCheckIcon';
import { CircleLoaderIcon } from 'assets/Icons/CircleLoaderIcon';
import { WarningIcon } from 'assets/Icons/WarningIcon';

const DEFAULT_CLASSES = ' px-4 py-2 gap-2 border [&>div]:m-0!';

export const toastsClassMap = {
  success: `${DEFAULT_CLASSES} bg-green-100! border-success!`,
  error: `${DEFAULT_CLASSES} bg-red-100! border-negative!`,
  loading: `${DEFAULT_CLASSES} bg-blue-100! border-primary!`,
  warning: `${DEFAULT_CLASSES} bg-yellow-100! border-warn!`,
};

const iconMap = {
  success: (
    <div className="text-success">
      <CircleCheckIcon />
    </div>
  ),
  error: (
    <div className="text-negative">
      <CircleAlertIcon />
    </div>
  ),
  loading: (
    <div className="text-primary animate-spin">
      <CircleLoaderIcon />
    </div>
  ),
  warning: (
    <div className="text-warn">
      <WarningIcon />
    </div>
  ),
};

export const renderToast = (type: keyof typeof toastsClassMap, message: string) => (
  <div className={`flex items-center gap-2`} onClick={() => toast.dismiss()}>
    {iconMap[type]}
    <p className="font-paragraph-3">{message}</p>
  </div>
);
