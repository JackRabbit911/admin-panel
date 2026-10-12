import { getPagesUrl } from "shared/constants"
import { createGetHook } from "shared/hooks/createHooks"

const useGetPagesQuery = createGetHook<string>(getPagesUrl)

const Pages = () => {
  const { data: title } = useGetPagesQuery()

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
