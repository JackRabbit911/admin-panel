import { useParams } from "react-router"
import { useGetQuery } from "shared/api"
import { getUsers } from "shared/constants"
import type { User } from "./types"

const Users = () => {
  const { id } = useParams()
  const url = id ? [getUsers, id].join('/') : getUsers
  const { data } = useGetQuery({ url })
  const list: User[] = data?.result?.list || null
  
  return list && (
    <>
      <h1 className="text-2xl">Users</h1>
      <ul>
        {list.map(
          (user: User, key: number | string) => (<li key={key}>{user.name}</li>)
        )}
      </ul>
    </>
  )
}

export default Users
