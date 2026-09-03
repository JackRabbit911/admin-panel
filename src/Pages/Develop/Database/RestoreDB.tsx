import { z } from "zod";
import { useEffect } from "react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslate } from "shared/i18n/hooks";
import { useGetQuery, usePostMutation } from "shared/api";
import { getDumpFilesUrl, sendDumpFileUrl } from "shared/constants";
import { openModalFn } from "Reused/ModalContainer/utils";

type File = {
  filename: string;
  time: string;
  size: number;
}

const userSelectionSchema = z.object({
  selectedFile: z.string().min(1)
});

type FormData = z.infer<typeof userSelectionSchema>;

const RestoreDB = () => {
  const { data, refetch } = useGetQuery(getDumpFilesUrl)
  const files = data?.result ? data?.result : []
  const [send] = usePostMutation()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      selectedFile: '',
    },
  })

  const __ = useTranslate()

  const currentSelection = watch("selectedFile")

  const onSubmit = async (body: FormData) => {
    const data = await send({
      url: sendDumpFileUrl,
      body: body
    }).unwrap()

    if (data.success) {
      openModalFn('ALERT', { message: data?.result })
    }
  }

  const disabled = currentSelection.length === 0

  useEffect(() => {
    refetch
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">
          {__('Chioce dump file')}
        </h2>
        <Link to="/tests">
          <span className="link">
            К таблицам
          </span>
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="overflow-x-auto">
          <table className="table table-hover table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>{__('File')}</th>
                <th>{__('Created')}</th>
                <th>{__('Size')}</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file: File) => {
                const isSelected = currentSelection === file.filename;

                return (
                  <tr
                    key={file.filename}
                    className={`cursor-pointer hover transition-colors ${isSelected ? "bg-base-200" : ""
                      }`}
                    onClick={() => setValue("selectedFile", file.filename, { shouldValidate: true })}
                  >
                    <td className="text-center">
                      <div className="flex justify-center">
                        <input
                          type="radio"
                          value={file.filename}
                          onClick={(e) => e.stopPropagation()}
                          {...register("selectedFile")}
                          className="radio radio-primary dark:radio-info radio-sm"
                          checked={isSelected}
                        />
                      </div>
                    </td>
                    <td className="font-bold">{file.filename}</td>
                    <td>
                      {file.time}
                    </td>
                    <td>{file.size}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            type="button"
            className="btn btn-success"
            onClick={refetch}
          >
            Обновить данные
          </button>
          <div>
            {files.length === 0 && <span className="text-warning">
              {__('No backups')}
            </span>}
          </div>
          <button
            type="submit"
            className="btn btn-primary dark:btn-info"
            disabled={disabled}
          >
            {__('Restore')}
          </button>
        </div>

      </form>
    </div>
  )
}

export default RestoreDB
