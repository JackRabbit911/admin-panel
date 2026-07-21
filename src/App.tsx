import { useEffect } from "react"
import { useLocation } from "react-router"

import AdminPanel from "./AdminPanel"
import { useGetQuery } from "./shared/api"
import { authUrl } from "./shared/constants"
import { setToken } from "./shared/store/tokenSlice"
import { useAppDispatch } from "./shared/store/hooks"
import TranslateProvider from "./shared/i18n/TranslateProvider"

function App() {
  const location = useLocation()
  const { data } = useGetQuery(authUrl)
  const dispatch = useAppDispatch()

  const token = data?.result.bearer ? data.result.bearer : null

  useEffect(() => {
    dispatch(setToken(token))
  }, [token, dispatch])

  return (
    <TranslateProvider deps={[location]}>
      {token && <AdminPanel />}
    </TranslateProvider>
  )
}

export default App
