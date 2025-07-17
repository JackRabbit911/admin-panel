import { useList } from "effector-react";
import { Link } from "react-router";
import { $usersList } from "store/users";

const List = () => useList($usersList, ({ id, name }) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <th>
      <Link className="btn btn-ghost btn-xs" to={`/users/${id}`}>
        details
      </Link>
    </th>
  </tr>
))

export default List
