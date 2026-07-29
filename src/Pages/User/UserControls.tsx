import type { GetText } from "shared/i18n/types"
import { openModal } from "shared/store/modalSlice";
import { getAdminBtnLabel, getDisabled } from "./utils"
import { useAppDispatch, useAppSelector } from "shared/store/hooks"
import type { User } from "Pages/Users/types";

type Props = {
  __: GetText;
  user: User;
}

const UserControls = ({ __, user }: Props) => {
  const dispatch = useAppDispatch()
  const adminRole = useAppSelector((state) => state.user.user?.role)
  const userRole = Number(user?.role)
  const { disabledAdmin, disabledBan, disabledRemove } = getDisabled(+(adminRole ?? 0), userRole)
  const adminBtnLabel = getAdminBtnLabel(userRole)

   const handleAdminClick = () => {
    dispatch(
      openModal({
        type: 'BITMASK',
        props: {
          adminRole: +(adminRole ?? 0),
          user: user,
        },
      })
    )
  }

  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-3 mt-4">
      <button
        className="btn btn-primary dark:btn-info xs:w-full"
      >
        {__('Send Message')}
      </button>
      <button
        className="btn btn-success xs:w-full"
        onClick={handleAdminClick}
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
