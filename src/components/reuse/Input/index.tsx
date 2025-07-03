import type { FormField } from "store/login/types";
import { getClassName } from "./utils";

type Props = {
  label: string;
  data: FormField,
  setValue: (value: string) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

const Input = ({
  label,
  setValue,
  data,
  type = 'text',
  placeholder = '',
  disabled = false
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setValue(event?.target.value || '')
  }

  const { status, value, message } = data
  const [inputClassName, messageClassName] = getClassName(status)

  return (
    <div>
      <label className="label">{label}</label>
      <input
        onChange={onChange}
        type={type}
        className={inputClassName}
        value={value}
        placeholder={placeholder || label}
        disabled={disabled || false}
      />
      {!message ? null : (
        <div className={messageClassName}>
          {message}
        </div>
      )}
    </div>
  )
}

export default Input
