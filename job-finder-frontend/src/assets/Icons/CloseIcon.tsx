import { getIconStyles, IconStylesProps } from 'assets/Icons/styles';

export const CloseIcon = (props: IconStylesProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={getIconStyles(props)}
  >
    <g clipPath="url(#clip0_3629_11190)">
      <path
        d="M12.0016 10.5874L13.4158 12.0016L23.7009 1.71645C24.0915 1.32592 24.0915 0.692756 23.7009 0.302232C23.3104 -0.0882927 22.6772 -0.0882927 22.2867 0.302232L12.0016 10.5874Z"
        fill="currentColor"
      />
      <path
        d="M12.0016 13.4158L10.5874 12.0016L0.302171 22.2868C-0.0883537 22.6773 -0.0883537 23.3105 0.302171 23.701C0.692695 24.0915 1.32586 24.0915 1.71638 23.701L12.0016 13.4158Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.302277 0.302246C-0.088247 0.69277 -0.0882468 1.32594 0.302277 1.71646L10.5874 12.0016L12.0016 10.5874L1.71649 0.302246C1.32597 -0.0882781 0.692801 -0.0882781 0.302277 0.302246ZM13.4158 12.0016L12.0016 13.4158L22.2868 23.701C22.6773 24.0915 23.3105 24.0915 23.701 23.701C24.0916 23.3105 24.0916 22.6773 23.701 22.2868L13.4158 12.0016Z"
        fill="currentColor"
      />
      <path
        d="M13.4158 12.0016L12.0016 10.5874L10.5874 12.0016L12.0016 13.4158L13.4158 12.0016Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_3629_11190">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
