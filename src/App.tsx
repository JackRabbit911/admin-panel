import { useEffect } from "react"
import { useLocation } from "react-router"

import AdminPanel from "AdminPanel"
import { useGetQuery } from "shared/api"
import { getUserByJWT } from "shared/utils"
import { authUrl } from "shared/constants"
import { setUser } from "shared/store/userSlice"
import ModalContainer from "Reused/ModalContainer"
import { setToken } from "shared/store/tokenSlice"
import { useAppDispatch } from "shared/store/hooks"
import TranslateProvider from "shared/i18n/TranslateProvider"
import Error from "Reused/Error"

function App() {
  const location = useLocation()
  const { data, isError, error } = useGetQuery(authUrl)
  const dispatch = useAppDispatch()

  const token = data?.result ? data.result : null

  useEffect(() => {
    if (token) {
      const user = getUserByJWT(token)
      dispatch(setToken(token))
      dispatch(setUser(user))
    }
  }, [token, dispatch])

  if (isError) {
    if ('data' in error) {
      return (
        <div className="h-screen">
          <Error status={error.status} />
        </div>
      )
    }
    return <div>Произошла ошибка соединения</div>;
  }

  return (
    <TranslateProvider deps={[location]}>
      {token && <AdminPanel />}
      <ModalContainer />
    </TranslateProvider>
  )
}

export default App
