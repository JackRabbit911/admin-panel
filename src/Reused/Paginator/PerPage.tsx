type Props = {
  perPages?: number[];
  limit?: number;
  setLimit: (Limit: number) => void;
}

const PerPage = ({
  perPages = [25, 50, 100],
  limit,
  setLimit,
}: Props) => {
  // const onSetPerPage = (count: number) => () => setPerPage(count)

  const getClassName = (count: number) =>
    `join-item btn btn-sm ${limit === count ? 'btn-active' : ''}`

  return (
    <div className="join">
      <span className="me-2 pt-2 text-xs">На странице</span>
      {perPages.map(
        (count, key) => (
          <button
            className={getClassName(count)}
            onClick={() => setLimit(count)}
            disabled={limit === count}
            key={key}
          >
            {count}
          </button>
        )
      )}
    </div>
  )
}

export default PerPage
