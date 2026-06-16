import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

type ValidationError = {
    key: string;
    msg: string;
}

type ServerValidationError = {
    status: number;
    data: {
        success: boolean;
        error: ValidationError[];
    };
}

export const useFormServerError = <TFieldValues extends FieldValues>() => {
    const handleServerError = (
        error: unknown,
        setError: UseFormSetError<TFieldValues>
    ) => {
        const serverError = error as ServerValidationError;

        if (serverError?.status === 422 && serverError?.data?.error) {

            const fields = serverError.data.error;

            fields.forEach((item) => {
                setError(item.key as Path<TFieldValues>, {
                    type: 'server',
                    message: item.msg,
                })
            })

            return true;
        }
        return false;
    };

    return { handleServerError };
};
