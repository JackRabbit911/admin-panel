import type { InputStatus } from "./types";
import { inputStatus } from "./utils";

type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  status?: InputStatus | null;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
};

const Input = ({
  label, value,
  setValue,
  status = null,
  type = 'text',
  placeholder = '',
  disabled = false
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setValue(event?.target.value || '')
  }

  const { className, message } = inputStatus (status)

  return (
    <div>
      <label className="label">{label}</label>
      <input
        onChange={onChange}
        type={type}
        className={className}
        value={value}
        placeholder={placeholder || label}
        disabled={disabled || false}
      />
      {!message ? null : (
        <div className="text-error">
          {message}
        </div>
      )}
    </div>
  )
}

export default Input
