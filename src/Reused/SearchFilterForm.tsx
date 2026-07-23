import type { FilterFormValues } from "Pages/Users/schema";
import type { FieldError, UseFormRegister } from "react-hook-form"
import { useTranslate } from "shared/i18n/hooks";

type Props = {
  register: UseFormRegister<FilterFormValues>;
  error: FieldError | undefined;
  handleReset: () => void;
}

const SearchFilterForm = ({ register, error, handleReset }: Props) => {
  const __ = useTranslate()
  const alert = !error ? null : <div
    className="fieldset-label text-error"
  >{error.message}</div>

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend flex justify-between w-full">
          <div>{__('Search & filter')}</div>
          {alert}
        </legend>
        <div className="join">
          <select
            className="select join-item max-w-42"
            {...register('filter')}
          >
            {/* <option value="" disabled={true}>{__('Filter')}</option> */}
            <option value="">Все пользователи</option>
            <option value="admin">Админы</option>
            <option value="ban">Забаненные</option>
          </select>
          <input
            className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
            placeholder={__('Search')}
            {...register('search')}
          />
          <button
            type="reset"
            className="btn btm-sm btn-square join-item border border-zinc-600"
            onClick={handleReset}
          >
            X
          </button>
        </div>
      </fieldset>
    </form>
  )
}

export default SearchFilterForm
