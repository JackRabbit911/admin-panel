import Paginator from "components/reuse/Paginator"
import PerPage from "components/reuse/Paginator/PerPage"
import { useUnit } from "effector-react"
import { $pagination, $usersTotal, usersPageNumberChanged, usersPerPageChanged } from "store/users"

const Pagination = () => {
  const { pageNumber, perPage } = useUnit($pagination)
  const total = useUnit($usersTotal)

  return (
    <div className="flex justify-between">
      <Paginator
        total={total}
        pageNumber={pageNumber}
        perPage={perPage}
        setPageNumber={usersPageNumberChanged}
      />
      <PerPage
        perPage={perPage}
        setPerPage={usersPerPageChanged}
      />
    </div>
  )
}

export default Pagination
