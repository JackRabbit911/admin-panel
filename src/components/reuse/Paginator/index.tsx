import { getPaginationData } from "./utils";
import Button from "./Button";

export type Props = {
  total: number;
  pageNumber: number;
  perPage: number;
  setPageNumber: (pageNumber: number) => void;
}

const Paginator = (props: Props) => {
  const onSetPageNumber = (pageNumber: number) => {
    props.setPageNumber(pageNumber)
  }

  const paginationData = getPaginationData(props)

  return (
    <div className="join">
      {paginationData.map(
        (page, key) => (
          <Button key={key} {...page} setPageNumber={onSetPageNumber} />
        )
      )}
    </div>
  )
}

export default Paginator
