import { useTranslate } from "shared/i18n/hooks"
import type { User } from "./types"
import TableRow from "./TableRow";


type Props = {
  list: User[];
  isFetching: boolean;
}

const Table = ({ list, isFetching }: Props) => {
  const __ = useTranslate()

  return (
    <div className="overflow-x-auto">
      <table className="table table-hover table-zebra">
        <thead>
          <tr>
            <th>{__('Name')}</th>
            <th>{__('Role')}</th>
          </tr>
        </thead>
        <tbody>
          {list.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isFetching={isFetching}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
