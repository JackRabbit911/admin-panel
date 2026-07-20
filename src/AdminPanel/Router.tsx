import { Route, Routes } from "react-router"
import Home from "../Home"

const Router = () => {
  return (
    <Routes>
      <Route path='' element={<Home />} />
      <Route path='pages' element={'Pages'} />
      <Route path='users' element={'Users'} />
      <Route path='tests' element={'Tests'} />
      <Route path='deploy' element={'Deploy'} />
      <Route path='seo' element={'SEO'} />
      <Route path='burime'>
        <Route path='works' element={'Works'} />
        <Route path='authors' element={'Authors'} />
      </Route>
      <Route path='*' element={'404'} />
    </Routes>
  )
}

export default Router
