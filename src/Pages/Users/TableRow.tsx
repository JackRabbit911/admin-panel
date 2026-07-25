import { host } from "shared/api/baseQuery";
import type { User } from "./types"
import { AVATAR_COLORS, getInitials, hashCode } from "./utils";
import { useNavigate } from "react-router";

type Props = {
  user: User;
  isFetching: boolean;
}

const TableRow = ({ user, isFetching }: Props) => {
  const navigate = useNavigate()
  const colorClass = AVATAR_COLORS[hashCode(user.name) % AVATAR_COLORS.length];

  return (
    <tr
      key={user.id}
      className={`cursor-pointer hover:bg-base-300 transition-all duration-200 ${isFetching ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}
      onClick={() => { navigate(`/user/${user.id}`) }}
    >
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className={`h-10 w-10 mask mask-squircle bg-neutral text-neutral-content ${user.avatarUrl ? '' : colorClass}`}>
              {user.avatarUrl ? (
                <img src={`${host}${user.avatarUrl}`} alt={user.name} />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-semibold text-sm">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          </div>
          <div>{user.name}</div>
        </div>
      </td>

      <td>
        {user.role &&
          <span className="badge badge-ghost badge-sm">{user.role}</span>
        }
      </td>
    </tr>
  )
}

export default TableRow
