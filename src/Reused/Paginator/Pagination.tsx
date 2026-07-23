import Paginator from ".";
import PerPage from "./PerPage";

type Props = {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

const Pagination = ({ total, page, limit, setPage, setLimit }: Props) => {
  const onSetPage = (page: number) => {
    setPage(page)
  }

  const onSetLimit = (limit: number) => {
    setLimit(limit)
  }

  return (
    <div className="flex justify-between mt-2">
      <Paginator
        total={total}
        page={page}
        limit={limit}
        setPage={onSetPage}
      />
      <PerPage
        limit={limit}
        setLimit={onSetLimit}
      />
    </div>
  )
}

export default Pagination
