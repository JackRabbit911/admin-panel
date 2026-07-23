import BtnGroup from "./BtnGroup";
import { getPaginationData } from "./utils";

export type Props = {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
}

const Paginator = (props: Props) => {
  const onSetPage = (pageNumber: number) => {
    props.setPage(pageNumber)
  }

  const { paginationData5, paginationData7 } = getPaginationData(props)

  return (
    <>
      <div className="join sm:hidden">
        <BtnGroup
          data={paginationData5}
          setPage={onSetPage}
        />
      </div>
      <div className="join hidden sm:block">
        <BtnGroup
          data={paginationData7}
          setPage={onSetPage}
        />
      </div>
    </>
  )
}

export default Paginator
