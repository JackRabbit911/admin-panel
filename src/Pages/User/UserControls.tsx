import type { GetText } from "shared/i18n/types"
import { useAppSelector } from "shared/store/hooks";

type Props = {
  __: GetText;
}

const UserControls = ({ __ }: Props) => {
  const adminRole = useAppSelector((state) => state.user.user?.role)
  console.log(adminRole)

  return (
    <div className="w-full flex flex-col sm:flex-row sm:justify-center gap-3 mt-4">
      <button
        className="btn btn-primary xs:w-full"
      >
        {__('Send Message')}
      </button>
      <button
        className="btn btn-success xs:w-full"
      >
        {__('Invite to Admin')}
      </button>
      <button
        className="btn btn-warning xs:w-full"
      >
        {__('Ban')}
      </button>
      <button
        className="btn btn-error xs:w-full"
      >
        {__('Remove')}
      </button>
    </div>
  )
}

export default UserControls
