import { useFormContext } from "react-hook-form"

type Props = {
  name: string;
  label: string;
  type?: string;
};

const TextFileld = ({ name, label, type = 'text' }: Props) => {
  const { register, formState: { errors } } = useFormContext()
  const message = errors[name]?.message as string || null;

  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" {...register(name)} type={type} />

      {!message ? null : (
        <div className="text-error">
          {message}
      </div>
      )}
    </div>
  )
}

export default TextFileld
