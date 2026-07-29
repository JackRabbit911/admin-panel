import { useEffect } from "react"
import { useLocation } from "react-router"

import AdminPanel from "AdminPanel"
import { useGetQuery } from "shared/api"
import { getUserByJWT } from "shared/utils"
import { authUrl } from "shared/constants"
import { setUser } from "shared/store/userSlice"
import { setToken } from "shared/store/tokenSlice"
import { useAppDispatch } from "shared/store/hooks"
import TranslateProvider from "shared/i18n/TranslateProvider"
import { ModalContainer } from "Reused/ModalContainer"

function App() {
  const location = useLocation()
  const { data } = useGetQuery(authUrl)
  const dispatch = useAppDispatch()

  const token = data?.result ? data.result : null

  useEffect(() => {
    if (token) {
      const user = getUserByJWT(token)
      dispatch(setToken(token))
      dispatch(setUser(user))
    }
  }, [token, dispatch])

  return (
    <TranslateProvider deps={[location]}>
      {token && <AdminPanel />}
      <ModalContainer />
    </TranslateProvider>
  )
}

export default App
