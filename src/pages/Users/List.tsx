import { useList } from "effector-react";
import { $usersList } from "store/users";

const List = () => useList($usersList, ({ name }, index) => (
  <tr>
    <td>{index + 1}</td>
    <td>{name}</td>
  </tr>
))

export default List
