import { useFormContext } from "react-hook-form"
import { getClassName } from "./utils";

type Props = {
  name: string;
  label: string;
  type?: string;
  rules?: object;
};

const TextFileld = ({ name, label, rules, type = 'text' }: Props) => {
  const { register, formState: { errors } } = useFormContext()

  const message = errors[name]?.message as string || '';
  const [inputClassName, messageClassName] = getClassName(errors[name])

  return (
    <div>
      <label className="label">{label}</label>
      <input
        className={inputClassName}
        {...register(name, rules)}
        type={type} />

      {errors[name] && (
        <div className={messageClassName}>
          {message}
      </div>
      )}
    </div>
  )
}

export default TextFileld
