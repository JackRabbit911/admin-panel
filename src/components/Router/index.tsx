import Homepage from "pages/HomePage"
import UserPage from "pages/User"
import Users from "pages/Users"
import { Route, Routes } from "react-router"

const Router = () => (
  <Routes>
    <Route path='/' element={<Homepage />} />
    <Route path='/users' element={<Users />} />
    <Route path='/users/:id' element={<UserPage />} />
  </Routes>
)

export default Router
