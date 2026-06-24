import { useTranslate } from "../shared/i18n/hooks"

const Loading = () => {
  const __ = useTranslate()

  return (
    <div className="flex flex-col justify-center min-h-[84vh]">
      <div className="w-full text-center text-2xl">
        {__('Loading')}{' '}
        <span className="loading loading-dots"></span>
      </div>
    </div>
  )
}

export default Loading
