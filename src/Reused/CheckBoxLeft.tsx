import React, { useId } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string; 
}

const CheckBoxLeft = ({
  label,
  className = '',
  containerClassName = '',
  id,
  ...props
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <label
      htmlFor={inputId}
      className={`label cursor-pointer justify-start gap-4 p-3 rounded-lg border border-base-200 hover:bg-base-200/50 transition-colors ${containerClassName}`}
    >
      <input
        {...props}
        id={inputId}
        type="checkbox"
        className={`checkbox ${className}`}
      />
      <span className="font-mono text-sm select-none">{label}</span>
    </label>
  );
};

export default CheckBoxLeft
