import { useLocation } from "react-router"

import Auth from "./Auth"
import AdminPanel from "./AdminPanel"
import { useAppSelector } from "./shared/store/hooks"
import TranslateProvider from "./shared/i18n/TranslateProvider"

function App() {
  const location = useLocation()
  const { user } = useAppSelector((state) => state.auth)

  return (
    <TranslateProvider deps={[location]}>
      {user ? <AdminPanel /> : <Auth />}
    </TranslateProvider>
  )
}

export default App
