import type { Author } from "Pages/Users/types"
import { host } from "shared/api/baseQuery";

type Props = {
  list: Author[];
}

const Authors = ({ list }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-hover table-sm">
        <tbody>
          {Boolean(list) && list?.map((item: Author) => (
            <tr key={item.id}>
              <td>
                <div className="avatar">
                  <div className={"h-10 w-10 mask mask-squircle bg-neutral text-neutral-content"}>
                    <img src={`${host}/ava/author/${item.id}`} alt={item.alias} />
                  </div>
                </div>
              </td>
              <td>
                {item.alias}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
