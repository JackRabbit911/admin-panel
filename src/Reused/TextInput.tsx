import { useFormContext } from "react-hook-form";
import { ObjectUtils } from "shared/utils";
import { useTranslate } from "../shared/i18n/hooks";
import { ErrorMessage } from "@hookform/error-message";

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
  const err = ObjectUtils.getProp(errors, fieldName)
  const __ = useTranslate()

  if (errors[fieldName]) {
    errors[fieldName].message = __(errors[fieldName].message as string)
  }

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
        {__(label)}
        {alert}
        {optional && <span className="fieldset-label">{__(optional)}</span>}
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
