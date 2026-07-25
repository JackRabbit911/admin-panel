import { useParams } from "react-router"
import { useGetQuery } from "shared/api"
import { host } from "shared/api/baseQuery"
import { getUsersUrl } from "shared/constants"
import { useTranslate } from "shared/i18n/hooks"

const dateLoc = (date: string | null) => {
  if (!date) {
    return ''
  }

  const dateObject = new Date(date)
  return dateObject.toLocaleDateString()
}

const User = () => {
  const { id } = useParams();
  const { data } = useGetQuery({ url: [getUsersUrl, id].join('/') })
  const user = data?.result
  const __ = useTranslate();

  return (
    <>
      {user &&
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between mb-4">
              <div
                className="avatar aspect-square size-24"
                style={{ cursor: 'pointer' }}
              >
                {id && <img src={`${host}${user.avatarUrl}`} alt={user.name} />}
              </div>
              <h1 className="text-2xl ms-4">
                {user.name}
              </h1>
            </div>
            <p className="flex justify-between mb-2">
              <span>Дата рождения:</span>
              <span>{dateLoc(user.dob)}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Дата регистрации:</span>
              <span>{dateLoc(user.created)}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>Email:</span>
              <span>{user.email}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>{__('Phone')}:</span>
              <span>{user.phone}</span>
            </p>
            <p className="flex justify-between mb-4">
              <span>{__('Sex')}:</span>
              <span>{user.sex ? __('Male') : __('Female')}</span>
            </p>
            <p className="flex justify-between mb-2">
              <span>{__('Authors')}:</span>
              <span>{user.authorsCount}</span>
            </p>
          </div>
          <div>
            <h2 className="w-full text-2xl text-center">
              Панель управления
            </h2>
            <ul className="text-center mt-4">
              <li>Написать сообщение</li>
              <li>Пригласить в админы</li>
              <li>Забанить</li>
            </ul>
          </div>
        </div>
      }
    </>
  )

}

export default User
