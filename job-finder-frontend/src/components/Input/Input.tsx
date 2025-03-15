import { Maybe } from "common/types";
import {
  HTMLInputProps,
  TextOnlyVariantProps,
  TextWithIconVariantProps,
} from "components/Input/types";
import { tv, VariantProps } from "tailwind-variants";

type BaseProps = Omit<VariantProps<typeof getStyles>, "error"> &
  HTMLInputProps & {
    value: string | number;
    label?: string;
    error?: Maybe<string | boolean>;
  };

type Props = (TextOnlyVariantProps | TextWithIconVariantProps) & BaseProps;

const getStyles = tv({
  base: "w-full h-10 px-4 flex gap-2 outline-none ring-0 bg-jf-gray-50 has-[:disabled]:bg-jf-warm-gray-100",
  variants: {
    border: {
      primary:
        "border border-black rounded-lg has-[:focus]:border-jf-purple-700",
      secondary: "border-b border-black has-[:focus]:border-jf-purple-700",
    },
    error: {
      true: " outline outline-offset-0 outline-2 border-jf-rose-600",
    },
  },
});

export const Input = (props: Props) => {
  const {
    name,
    border,
    label,
    value,
    placeholder,
    disabled,
    error,
    inputMode,
    maxLength,
    type,
    sideElement,
    sideElementPosition,
    onChange,
  } = props;

  const styles = getStyles({
    border: border,
    error: Boolean(error),
  });

  const showErrorMessage = typeof error === "string";
  const inputKeyboardType = type === "number" ? "numeric" : inputMode;

  return (
    <div className="w-full flex flex-col gap-1 text-jf-geologica">
      {label && (
        <label htmlFor={name} className="font-jf-paragraph">
          {label}
        </label>
      )}

      <div className={styles}>
        <div
          className={`w-full flex justify-center items-center gap-2 ${
            sideElementPosition === "start" && "flex-row-reverse"
          }`}
        >
          <input
            {...props}
            id={name}
            name={name}
            placeholder={placeholder}
            type={type}
            inputMode={inputKeyboardType}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            onChange={(e) => {
              if (!onChange) {
                return;
              }

              onChange(e);
            }}
            className="w-full p-0 flex-grow text-jf-geologica border-none placeholder:text-sm placeholder:text-jf-warm-gray-500 focus:border-transparent focus:outline-none focus:ring-0 disabled:bg-jf-warm-gray-100"
          />

          {sideElement && <div>{sideElement}</div>}
        </div>
      </div>
      {showErrorMessage && (
        <span className="text-red-500 text-sm">{error}</span>
      )}
    </div>
  );
};
