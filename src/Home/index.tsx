import { useAppSelector } from "../shared/store/hooks"

const Home = () => {
  const bearer = useAppSelector((state) => state.token.bearer)

  return (
    <>
      <div className="break-all">
        {bearer}
      </div>
    </>
  )
}

export default Home
