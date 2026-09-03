import { Outlet } from "react-router"
import { useTranslate } from "shared/i18n/hooks"

const Develop = () => {
  const __ = useTranslate()

  return (
    <>
      <h1 className="text-2xl">{__('Develop')}</h1>
      <Outlet />
    </>
  )
}

export default Develop
