import { useGetQuery } from "shared/api"
import { getDashboardUrl } from "shared/constants"

const Home = () => {
  const { data } = useGetQuery({ url: getDashboardUrl })
  const dashboard = data?.result || null

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
