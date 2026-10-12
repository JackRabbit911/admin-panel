import { getDashboardUrl } from "shared/constants"
import { createGetHook } from "shared/hooks/createHooks";

const Home = () => {
  const useGeDashboardQuery = createGetHook<string>(getDashboardUrl)
  const { data: dashboard } = useGeDashboardQuery()
  
  return (
    <>
      <div className="break-all">
        <h1 className="text-2xl">Dashboard</h1>
        {dashboard && <h1>{dashboard}</h1>}
      </div>
    </>
  )
}

export default Home
