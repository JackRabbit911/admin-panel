import { useUnit } from "effector-react"
import { $usersTotal, usersPageNumberChanged } from "store/users"

const Header = () => {
    const total = useUnit($usersTotal)

    return (
        <div className="flex flex-row gap-3">
            <h1>Пользователи</h1>
            <div>Всего: {total}</div>
            <button className="btn" onClick={() => {
                usersPageNumberChanged(2)
            }}>2</button>
        </div>
    )
}

export default Header
