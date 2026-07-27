import { useParams } from "react-router"
import { useGetQuery } from "shared/api"
import { host } from "shared/api/baseQuery"
import { getUsersUrl } from "shared/constants"
import { useTranslate } from "shared/i18n/hooks"
import Collapse from "./Collapse"
import Authors from "./List/Authors"
import Books from "./List/Books"
import type { User } from "Pages/Users/types"
import UserLayOut from "./UserLayOut"
import UserControls from "./UserControls"

const dateLoc = (date: string | undefined) => {
  if (!date) {
    return ''
  }

  const dateObject = new Date(date)
  return dateObject.toLocaleDateString()
}

const UserCmp = () => {
  const { id } = useParams();
  const { data } = useGetQuery({ url: [getUsersUrl, id].join('/') })
  const user: User = data?.result
  const __ = useTranslate();

  return (
    <UserLayOut>
      {user &&
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
          <Collapse
            label="Authors"
            allow={user?.authors?.allow || false}
            total={user?.authors?.total || 0}
            own={user?.authors?.own}
          >
            <Authors
              list={user?.authors?.list || []}
            />
          </Collapse>
          <Collapse
            label="Books"
            allow={user?.books?.allow || false}
            total={user?.books?.total || 0}
            own={user?.books?.own}
          >
            <Books
              list={user?.books?.list || []}
            />
          </Collapse>
          
          <p className="flex justify-between mb-2">
            <span>{__('Posts')}:</span>
            <span>{user.posts}</span>
          </p>
          <p className="flex justify-between mb-2">
            <span>{__('Comments')}:</span>
            <span>{user.comments}</span>
          </p>
          <p className="flex justify-between mb-2">
            <span>{__('Rating')}:</span>
            <span>{user.rating}</span>
          </p>  
        </div>
      }
      <UserControls __={__} />
    </UserLayOut>
  )

}

export default UserCmp
