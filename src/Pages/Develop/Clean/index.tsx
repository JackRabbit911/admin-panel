import { useEffect, useState } from "react"
import { getClearUrl } from "shared/constants"
import { useTranslate } from "shared/i18n/hooks"
import { useGetQuery, usePostMutation } from "shared/api"
import Btn from "./Btn"

const defaults = {
  logs: 0,
  sessions: 0,
  tokens: 0,
}

const Clean = () => {
  const { data, isLoading, refetch } = useGetQuery({ url: getClearUrl })
  const [counts, setCounts] = useState(defaults)
  const [clear] = usePostMutation()
  const __ = useTranslate()

  const onClear = (action: string) => {
    clear({
      url: getClearUrl,
      method: 'DELETE',
      body: { action },
    })

    refetch()
  }

  const sum = (Object.values(counts) as number[]).reduce((acc, val) => acc + val, 0);

  useEffect(() => {
    if (data?.result) {
      setCounts(data.result)
    }
  }, [data])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <h2 className="text-lg mt-4">
        {__('Cleaning')}
      </h2>
      <div className="flex flex-col items-center justify-center p-6 bg-base-100 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-base-200">
        <Btn
          label="Clear error.log"
          count={counts.logs}
          action="logs"
          onClear={onClear}
        />
        <Btn
          label="Clear sessions"
          count={counts.sessions}
          action="sessions"
          onClear={onClear}
        />
        <Btn
          label="Clear tokens"
          count={counts.tokens}
          action="tokens"
          onClear={onClear}
        />
        <Btn
          label="Clear all"
          count={sum}
          action="all"
          onClear={onClear}
        />
      </div>
    </>
  )
}

export default Clean
