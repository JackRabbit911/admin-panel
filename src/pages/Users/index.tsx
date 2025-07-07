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
      <div className="overflow-x-auto">
        <table className="table">
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
      </div>
    </>
  )
}

export default Users
