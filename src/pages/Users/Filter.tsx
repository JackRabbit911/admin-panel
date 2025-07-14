import { useUnit } from "effector-react"
import { useForm } from "react-hook-form"
import { $usersFilter, usersFilterChanged, usersFilterReset } from "store/users"
import type { UsersFilter } from "store/users/types"
import { validation } from "./constants"

const Filter = () => {
  const filter = useUnit($usersFilter)
  const methods = useForm<UsersFilter>({
    defaultValues: filter,
    mode: "onChange",
  })
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = methods

  const onSubmit = (formData: UsersFilter) => {
    usersFilterChanged(formData)
  }

  const onReset = () => {
    methods.reset({name: ''})
    usersFilterReset()
  }

  const message = errors.name?.message as string || '';

  return (
    <form className="mt-2 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="join">
        <input
          type="text"
          placeholder="ФИО"
          className="input input-sm join-item"
          { ...register('name', validation.name)}
        />
        <button
          type="submit"
          className="btn btn-sm join-item"
          disabled={!isValid}
        >
          Search
        </button>
         <button
          className="btn btn-sm join-item"
          onClick={methods.handleSubmit(onReset)}
        >
          Reset
        </button>
      </div>
      {errors && (
        <div className="text-error text-xs mt-1">
          {message}
        </div>)}
    </form>
  )
}

export default Filter
