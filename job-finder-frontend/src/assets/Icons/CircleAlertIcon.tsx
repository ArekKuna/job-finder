import { getIconStyles, IconStylesProps } from 'assets/Icons/styles';

export const CircleAlertIcon = (props: IconStylesProps) => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={getIconStyles(props)}
  >
    <g clipPath="url(#clip0_3698_14300)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24.5034C18.6274 24.5034 24 19.1308 24 12.5034C24 5.876 18.6274 0.503418 12 0.503418C5.37258 0.503418 0 5.876 0 12.5034C0 19.1308 5.37258 24.5034 12 24.5034ZM10.5 7.00342C10.5 6.17499 11.1716 5.50342 12 5.50342C12.8284 5.50342 13.5 6.17499 13.5 7.00342V12.5034C13.5 13.3318 12.8284 14.0034 12 14.0034C11.1716 14.0034 10.5 13.3318 10.5 12.5034V7.00342ZM13.625 17.5034C13.625 18.4009 12.8975 19.1284 12 19.1284C11.1025 19.1284 10.375 18.4009 10.375 17.5034C10.375 16.606 11.1025 15.8784 12 15.8784C12.8975 15.8784 13.625 16.606 13.625 17.5034Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_3698_14300">
        <rect width="24" height="24" fill="white" transform="translate(0.0234375 0.503296)" />
      </clipPath>
    </defs>
  </svg>
);
