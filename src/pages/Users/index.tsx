import { useEffect } from "react"
import { fetchUsersFirst } from "store/users"
import List from "./List"
import Header from "./Header"
import Pagination from "./Pagination"

const Users = () => {
  useEffect(() => {
    fetchUsersFirst()
  }, [])

  return (
    <>
      <Header />
      <Pagination />
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
      <Pagination />
    </>
  )
}

export default Users
