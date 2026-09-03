import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetQuery } from 'shared/api';
import { TableActions } from './TableActions';
import CheckBoxLeft from 'Reused/CheckBoxLeft';
import { getTablesUrl } from 'shared/constants';
import { useTranslate } from 'shared/i18n/hooks';
import { tableActionSchema, type TableActionFormValues } from './schema';

const TableManager = () => {
  const { data } = useGetQuery({ url: getTablesUrl })
  const tables: string[] = data?.result ? data.result.tables : []
  const exclude: string[] = data?.result ? data.result.exclude : []

  const set2 = new Set(exclude.map(item => item.toLowerCase()))
  const selected = tables.filter(item => !set2.has(item.toLowerCase()))

  const __ = useTranslate()

  const {
    control,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<TableActionFormValues>({
    resolver: zodResolver(tableActionSchema),
    mode: 'onChange',
    values: {
      tables: selected,
    },
  });

  const selectedTables = watch('tables') || []
  const isAllSelected = selectedTables.length === tables.length

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setValue('tables', [], { shouldValidate: true })
    } else {
      setValue('tables', tables, { shouldValidate: true })
    }
  }

  const isNoneSelected = selectedTables.length === 0

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold my-4">
          {__('Managing database tables')}
        </h2>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-base-200">
        <span className="text-sm text-base-content/70">
          {__('%d of %d selected', selectedTables.length, tables.length)}
        </span>
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={handleToggleSelectAll}
        >
          {isAllSelected ? 'Снять выделение' : 'Выбрать все'}
        </button>
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
        <Controller
          name="tables"
          control={control}
          render={({ field }) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {tables.map((table) => {
                const isChecked = field.value.includes(table);
                return (
                  <CheckBoxLeft
                    key={table}
                    label={table}
                    checked={isChecked}
                    className="dark:checkbox-info checkbox-sm"
                    onChange={() => {
                      if (isChecked) {
                        field.onChange(field.value.filter((t) => t !== table))
                      } else {
                        field.onChange([...field.value, table])
                      }
                    }}
                  />
                );
              })}
            </div>
          )}
        />
        <TableActions
          tables={selectedTables}
          isSubmitting={isSubmitting}
          isDisabled={isNoneSelected}
        />
      </form>
    </>
  );
};

export default TableManager
