import { useUnit } from "effector-react"
import Drawer from "./components/Drawer"
import Login from "./components/Login"
import { $currentUser } from "store/currentUser"

function App() {
  const user = useUnit($currentUser)

  return user ? <Drawer /> : <Login />
}

export default App
