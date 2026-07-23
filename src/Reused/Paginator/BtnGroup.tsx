import Button from "./Button";
import type { PaginationButton } from "./types"

type Props = {
  data: PaginationButton[];
  setPage: (page: number) => void;
}

const BtnGroup = ({ data, setPage }: Props) => {
  return (
    <>
      {
        data.length > 1 ?
          data.map(
            (pb, key) => (
              <Button
                key={key}
                {...pb}
                setPageNumber={setPage}
              />
            )
          ) : ''
      }
    </>
  )
}

export default BtnGroup
