import Homepage from "pages/HomePage"
import Users from "pages/Users"
import { Route, Routes } from "react-router"

const Router = () => (
  <Routes>
    <Route path='/' element={<Homepage />} />
    <Route path='/users' element={<Users />} />
  </Routes>
)

export default Router
