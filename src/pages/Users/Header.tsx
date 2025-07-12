import { useUnit } from "effector-react"
import { $usersTotal } from "store/users"

const Header = () => {
  const total = useUnit($usersTotal)

  return (
    <div className="flex flex-row gap-3">
      <h1>Пользователи</h1>
      <div>Всего: {total}</div>
    </div>
  )
}

export default Header
