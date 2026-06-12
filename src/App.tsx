import Auth from "./Auth"
import AdminPanel from "./AdminPanel"

function App() {
  const user = null

  return user ? <AdminPanel /> : <Auth />
}

export default App
