import { Route, Routes } from "react-router"
import Home from "Home"
import Pages from "Pages/Pages"
import Tests from "Pages/Tests"
import Users from "Pages/Users"
import UserCmp from "Pages/User"
import Error from "Reused/Error"
import Develop from "Pages/Develop"
import RestoreDB from "Pages/Develop/Database/RestoreDB"
import TableManager from "Pages/Develop/Database/TableManager"
import Others from "Pages/Others"
import Clean from "Pages/Develop/Clean"

const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='pages' element={<Pages />} />
      <Route path='users' element={<Users />} />
      <Route path='user/:id' element={<UserCmp />} />
      <Route path='tests' element={<Tests />} />
      <Route path='develop' element={<Develop />}>
        <Route path='database'>
          <Route index element={<TableManager />} />
          <Route path='import' element={<RestoreDB />} />
        </Route>
        <Route path='clean' element={<Clean />} />
      </Route>
      <Route path='deploy' element={'Deploy'} />
      <Route path='seo' element={'SEO'} />
      <Route path='burime'>
        <Route path='works' element={'Works'} />
        <Route path='authors' element={'Authors'} />
      </Route>
      <Route path='others' element={<Others />} />
      <Route path='*' element={<Error status={404} />} />
    </Routes>
  )
}

export default Router
