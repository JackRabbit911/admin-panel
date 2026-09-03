import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import TextInput from "Reused/TextInput"
import { useTranslate } from "shared/i18n/hooks"
import { openModalFn } from "Reused/ModalContainer/utils"
import { useGetQuery, usePostMutation } from "shared/api"
import { dumpDbUrl, getDumpFileName } from "shared/constants"
import type { ModalPropsMap } from "shared/store/modalSlice"

const fileNameSch = z.object({
  filename: z.string().regex(/^[a-zA-Z0-9.()_-]+$/, {
    message: "The entered string contains invalid characters",
  })
})

type FileName = z.infer<typeof fileNameSch>

type Props = {
  props: ModalPropsMap['BACKUP'];
  onClose: () => void;
}

const BackupName = ({ props, onClose }: Props) => {
  const { data, isLoading, isFetching, refetch } = useGetQuery({ url: getDumpFileName })
  const filename = data ? data?.result : null
  const [send] = usePostMutation()

  const methods = useForm<FileName>({
    resolver: zodResolver(fileNameSch),
    mode: "onChange",
    defaultValues: {
      filename: filename,
    },
  })

  const __ = useTranslate()

  const onSubmit: SubmitHandler<FileName> = async (formData) => {
    try {
      const arg = {
        url: dumpDbUrl,
        body: {
          filename: formData.filename,
          tables: props.tables,
        },
      }

      const response = await send(arg).unwrap()

      if (response.success) {
        onClose();
        openModalFn('ALERT', { message: __('Dump was created successfully') })
      } else {
        console.log(response)
      }
    } catch (err) {
      console.log(err)
      // const isHandled = handleServerError(err, methods.setError);
      // if (!isHandled) {
      //   console.error('Глобальная ошибка сервера (не 422):', err);
      // }
    }
  }

  if (!filename || isLoading || isFetching) {
    return null
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-row justify-center">
          <h1 className="text-xl">{__('Dump database')}</h1>
        </div>
        <TextInput
          fieldName="filename"
          label="Archive file name"
          placeholder={__('Enter the bacup file name')}
        />
        <div className="flex justify-between gap-2 my-4">
          <button
            type="button"
            className="btn btn-success"
            onClick={refetch}
          >
            {__('Update data')}
          </button>
          <button
            className="btn btn-primary dark:btn-info grow"
            disabled={!methods.formState.isValid}
          >
            {__('Save')}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default BackupName
