type Props = {
  total: number;
  perPages?: number[];
  limit?: number;
  setLimit: (Limit: number) => void;
}

const PerPage = ({
  total,
  perPages = [24, 60, 120],
  limit,
  setLimit,
}: Props) => {
  const getClassName = (count: number) =>
    `join-item btn btn-sm ${limit === count ? 'btn-active' : ''}`

  if (total <= perPages[0]) {
    return null
  }

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
