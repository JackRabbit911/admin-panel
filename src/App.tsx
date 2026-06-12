import Auth from "./Auth"
import Layout from "./Layout"

function App() {
  const user = null

  return user ? <Layout /> : <Auth />
}

export default App
