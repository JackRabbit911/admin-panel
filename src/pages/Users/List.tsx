import { useList } from "effector-react";
import { $usersList } from "store/users";

const List = () => useList($usersList, ({ name }, index) => (
  <tr>
    <td>{index + 1}</td>
    <td>{name}</td>
    <th>
      <button className="btn btn-ghost btn-xs">
        details
      </button>
    </th>
  </tr>
))

export default List
