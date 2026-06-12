import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { getObjectProp } from "../shared/utils";

type Props = {
  fieldName: string;
  label: string;
  optional?: string;
  placeholder?: string;
  type?: string;
  max?: string;
}

const TextInput = ({
  fieldName, label, optional, placeholder, type = 'text', max
}: Props) => {
  const { register, formState: { errors } } = useFormContext();
  const err = getObjectProp(errors, fieldName)

  const inputClassName =
    err ?
      "input w-full input-error" :
      "input w-full";

  const alert = err ? <ErrorMessage
    as="div"
    name={fieldName}
    errors={errors}
    className="fieldset-label text-error"
  /> : null

  return (
    <fieldset className="fieldset">
      <legend className="fieldset-legend flex justify-between w-full">
        {label}
        {alert}
        <span className="fieldset-label">{optional}</span>
      </legend>
      <input
        type={type}
        {...register(fieldName)}
        placeholder={placeholder}
        className={inputClassName}
        max={max}
      />
    </fieldset>
  )
}

export default TextInput
