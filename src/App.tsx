import { useLocation } from "react-router"

import Auth from "./Auth"
import AdminPanel from "./AdminPanel"
import { useAppSelector } from "./shared/store/hooks"
import TranslateProvider from "./shared/i18n/TranslateProvider"

function App() {
  const location = useLocation()
  const username = useAppSelector((state) => state.username.name)

  return (
    <TranslateProvider deps={[location]}>
      {username ? <AdminPanel /> : <Auth />}
    </TranslateProvider>
  )
}

export default App
