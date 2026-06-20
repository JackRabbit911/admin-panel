import { useLocation } from "react-router"

import Auth from "./Auth"
import AdminPanel from "./AdminPanel"
import { useUser } from "./shared/hooks/useUser"
import TranslateProvider from "./shared/i18n/TranslateProvider"

function App() {
  const location = useLocation()
  const user = useUser()

  return (
    <TranslateProvider deps={[location]}>
      {user ? <AdminPanel /> : <Auth />}
    </TranslateProvider>
  )
}

export default App
