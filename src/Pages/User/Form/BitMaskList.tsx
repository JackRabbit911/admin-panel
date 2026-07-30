import { Controller, useFormContext } from "react-hook-form"

import { P } from "shared/constants";
import { checkBoxDisabled } from "../utils"
import { useAppSelector } from "shared/store/hooks";

const BitMaskList = () => {
  const { control } = useFormContext()
  const admin = useAppSelector((state) => state.user.user)
  const adminRole = +(admin?.role ?? 0)

  return (
    <div>
      {Object.entries(P).filter(([k, _]) => k !== 'ROOT').map(([label, value], index) => {
        return (
          <Controller
            key={label}
            name={`bits.${index}`}
            control={control}
            render={({ field }) => (
              <label
                className="fieldset-label flex justify-between mb-2"
              >
                {label}
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="checkbox checkbox-md my-1"
                  disabled={checkBoxDisabled(value, adminRole)}
                />
              </label>
            )}
          />
        )
      })}
    </div>
  )
}

export default BitMaskList
