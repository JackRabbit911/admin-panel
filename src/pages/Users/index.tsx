import { useEffect } from "react"
import { getUsersFx } from "store/users"
import List from "./List"
import Header from "./Header"

const Users = () => {

  useEffect(() => {
    getUsersFx()
  }, [])

  return (
    <>
      <Header />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Имя</th>
              <th></th>
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
