type Props = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  message: string;
  className?: string;
  disabled?: boolean;
  type?: string;
};

const Input = ({
  label, value,
  setValue,
  type = 'text',
  className='input',
  message = '',
  disabled = false
}: Props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    setValue(event?.target.value || '')
  }

  return (
    <div>
      <label className="label">{label}</label>
      <input
        onChange={onChange}
        type={type}
        className={className}
        value={value}
        disabled={disabled}       
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
