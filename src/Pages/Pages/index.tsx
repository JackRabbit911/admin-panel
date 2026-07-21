import { useGetQuery } from "shared/api"
import { getPagesUrl } from "shared/constants"

const Pages = () => {
  const { data } = useGetQuery({ url: getPagesUrl })
  const title: string = data?.result || null

  return (
    <>
      <h1 className="text-2xl">Pages</h1>
      <div>
        {title}
      </div>
    </>
  )
}

export default Pages
