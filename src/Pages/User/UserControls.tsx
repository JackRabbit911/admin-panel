import type { GetText } from "shared/i18n/types"
import { useAppSelector } from "shared/store/hooks"
import { getAdminBtnLabel, getDisabled } from "./utils"

type Props = {
  __: GetText;
  role: number | null;
}

const UserControls = ({ __, role }: Props) => {
  const adminRole = useAppSelector((state) => state.user.user?.role)
  const { disabledAdmin, disabledBan, disabledRemove } = getDisabled(+(adminRole ?? 0), Number(role))
  const adminBtnLabel = getAdminBtnLabel(Number(role))

  console.log(disabledAdmin, disabledRemove)

  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-3 mt-4">
      <button
        className="btn btn-primary xs:w-full"
      >
        {__('Send Message')}
      </button>
      <button
        className="btn btn-success xs:w-full"
        disabled={disabledAdmin}
      >
        {__(adminBtnLabel)}
      </button>
      <button
        className="btn btn-warning xs:w-full"
        disabled={disabledBan}
      >
        {__('Ban')}
      </button>
      <button
        className="btn btn-error xs:w-full"
        disabled={disabledRemove}
      >
        {__('Remove')}
      </button>
    </div>
  )
}

export default UserControls
