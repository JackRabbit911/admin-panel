import { Link } from "react-router"
import type { MouseEventHandler } from "react"

import { useGetQuery } from "shared/api"
import { getTablesUrl } from "shared/constants"
import { useTranslate } from "shared/i18n/hooks"
import { openModalFn } from "Reused/ModalContainer/utils"

const clearBurime = [
  'branches', 'branches_genres', 'branches_authors', 'branches_posts',
  'drafts', 'posts', 'posts_ratings', 'messages', 'messages_authors',
]
const clearAuthors = ['authors', 'authors_authors', 'users_authors']
const clearAuthorsBurime = [...new Set([...clearBurime, ...clearAuthors])];

type BtnProps = {
  label: string;
  func: MouseEventHandler<HTMLButtonElement>;
  color?: string;
}

const Btn = ({ label, func, color = '' }: BtnProps) => {
  return (
    <button
      className={`btn btn-outline ${color}`}
      onClick={func}
    >
      {label}
    </button>
  )
}

const Tests = () => {
  const { data } = useGetQuery({ url: getTablesUrl })
  const __ = useTranslate()

  const tables: string[] = data?.result ? data.result.tables : []
  const exclude: string[] = data?.result ? data.result.exclude : []
  const set2 = new Set(exclude.map(item => item.toLowerCase()))
  const clearAll = tables.filter(item => !set2.has(item.toLowerCase()))

  const onDump = () => () => openModalFn('BACKUP', { tables })
  const onTruncate = (tables: string[] | undefined): React.MouseEventHandler<HTMLButtonElement> => {
    return () => {
      openModalFn('CONFIRM', {
        payload: { tables },
        actionType: 'truncate',
      })
    }
  }

  return (
    <>
      <h1 className="text-2xl">{__('Testing')}</h1>
      <h2 className="text-lg mt-4">
        {__('Import/Export')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <button className="btn btn-outline btn-success">
          <Link to='/develop/database/import'>
            {__('Restore')}
          </Link>
          {__('Import')}
        </button>
        <Btn label={__("Export")} func={onDump()} color="btn-primary dark:btn-info" />
      </div>
      <h2 className="text-lg mt-4">
        {__('Cleaning')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <Btn label={__("Clear all")} func={onTruncate(clearAll)} color="btn-error" />
        <Btn
          label={__("Clear authors and burime")}
          func={onTruncate(clearAuthorsBurime)}
          color="btn-warning"
        />
        <Btn label="Clear burime only" func={onTruncate(clearBurime)} />
      </div>
    </>
  )
}

export default Tests
