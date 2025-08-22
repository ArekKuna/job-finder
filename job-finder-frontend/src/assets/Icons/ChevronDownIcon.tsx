import { getIconStyles, IconStylesProps } from "assets/Icons/styles";

export const ChevronDownIcon = (props: IconStylesProps) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={getIconStyles(props)}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.9997 16.6462L22.2088 6.43711C22.5993 6.04659 23.2325 6.04659 23.623 6.43711C24.0135 6.82763 24.0135 7.4608 23.623 7.85132L13.2375 18.2368C13.0752 18.3993 12.8819 18.5287 12.6698 18.6166C12.4574 18.7047 12.2298 18.75 11.9999 18.75C11.77 18.75 11.5424 18.7047 11.33 18.6166C11.118 18.5287 10.9253 18.3999 10.763 18.2376L10.7623 18.2368L0.353762 7.85213C-0.0372094 7.46206 -0.0379341 6.82889 0.352143 6.43792C0.74222 6.04695 1.37538 6.04622 1.76636 6.4363L11.9997 16.6462Z"
        fill="currentColor"
      />
    </svg>
  );
};
