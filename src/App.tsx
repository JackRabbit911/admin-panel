import Drawer from "./components/Drawer"
import Login from "./components/Login"

function App() {
  const user = null

  return user ? <Drawer /> : <Login />
}

export default App
