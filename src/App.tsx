import { useLocation } from "react-router"

import AdminPanel from "./AdminPanel"
import TranslateProvider from "./shared/i18n/TranslateProvider"

function App() {
  const location = useLocation()

  return (
    <TranslateProvider deps={[location]}>
      <AdminPanel />
    </TranslateProvider>
  )
}

export default App
