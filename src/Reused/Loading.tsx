// import { useTranslate } from "common/i18n/hooks"

const Loading = () => {
  // const __ = useTranslate()

  return (
    <div className="text-center text-2xl">
      Loading
      {/* {__('Loading')}{' '} */}
      <span className="loading loading-dots"></span>
    </div>
  )
}



export default Loading
