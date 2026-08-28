import { Route, Routes } from "react-router"
import Home from "Home"
import Pages from "Pages/Pages"
import Tests from "Pages/Tests"
import Users from "Pages/Users"
import UserCmp from "Pages/User"
import Error from "Reused/Error"
import RestoreDB from "Pages/Tests/RestoreDB"
import TableManager from "Pages/Tests/TableManager"

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='pages' element={<Pages />} />
      <Route path='users' element={<Users />} />
      <Route path='user/:id' element={<UserCmp />} />
      <Route path='tests' element={<Tests />}>
        <Route index element={<TableManager />} />
        <Route path='restore' element={<RestoreDB />} />
      </Route>
      <Route path='deploy' element={'Deploy'} />
      <Route path='seo' element={'SEO'} />
      <Route path='burime'>
        <Route path='works' element={'Works'} />
        <Route path='authors' element={'Authors'} />
      </Route>
      <Route path='*' element={<Error status={404} />} />
    </Routes>
  )
}

export default Router
