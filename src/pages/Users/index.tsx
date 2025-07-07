import { useEffect } from "react"
import { getUsersFx } from "store/users"
import List from "./List"

const Users = () => {

  useEffect(() => {
    getUsersFx()
  }, [])

  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Имя</th>
          </tr>
        </thead>
        <tbody>
          <List />
        </tbody>
      </table>
    </>
  )
}

export default Users
