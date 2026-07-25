import { useSearchFilterPagination } from '../../Reused/Paginator/hooks'
import { useTranslate } from 'shared/i18n/hooks'
import Pagination from 'Reused/Paginator/Pagination'
import SearchFilterForm from 'Reused/SearchFilterForm'
import { getUsersUrl } from 'shared/constants';
import type { User } from './types';
import Table from './Table';

const Users = () => {
  const {
    page,
    limit,
    result,
    isFetching,
    register,
    errors,
    handlePageChange,
    handleLimitChange,
    handleReset,
  } = useSearchFilterPagination(getUsersUrl)

  const list: User[] = result?.list || []
  const total: number = result?.total || 0
  const selected: number = result?.selected || 0

  const __ = useTranslate()

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{__('Users list')}</h1>
        <div>{__('% of % selected', selected, total)}</div>
      </div>
      <SearchFilterForm
        register={register}
        error={errors.search}
        handleReset={handleReset}
      />
      <Pagination
        total={selected}
        page={page}
        limit={limit}
        setPage={handlePageChange}
        setLimit={handleLimitChange}
      />
      <div className="bg-base-100 rounded-box border border-base-200 divide-y divide-base-200 overflow-hidden shadow-sm">
        {list && list.length > 0 ? (
          <Table
            list={list}
            isFetching={isFetching}
          />
        ) : (
          <div className="p-8 text-center text-base-content/60">
            {__('Nothing found matching your request')}.
          </div>
        )}
      </div>
      <Pagination
        total={selected}
        page={page}
        limit={limit}
        setPage={handlePageChange}
        setLimit={handleLimitChange}
      />
    </div>
  );
};

export default Users
