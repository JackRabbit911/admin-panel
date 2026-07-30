import { useFormContext } from "react-hook-form"
import type { GetText } from "shared/i18n/types";

type Props = {
  __: GetText;
}

const BitMaskControls = ({ __ }: Props) => {
  const { setValue, reset } = useFormContext()

  const onClear = () => {
    const zero = Array(8).fill(false) as boolean[]
    setValue('bits', zero, { shouldDirty: true })
  }

  return (
    <div className="flex gap-2 w-full">
      <button
        type="button"
        onClick={onClear}
        className="grow btn btn-error"
      >
        {__('Clear')}
      </button>
      <button
        type="button"
        onClick={() => { reset() }}
        className="grow btn"
      >
        {__('Reset')}
      </button>
      <button
        type="submit"
        className="grow btn btn-primary dark:btn-info"
      >
        {__('Save')}
      </button>
    </div>
  )
}

export default BitMaskControls
