import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFilterSearchQuery } from "shared/api"
import { useDebounce } from "shared/hooks/debounce"
import { filterSchema, type FilterFormValues } from "./schema"

// 1. Описываем структуру ошибки, которую возвращает именно ВАШ кастомный baseQuery
interface CustomApiError {
    status: number;
    data: {
        success: boolean;
        error: Array<{
            key: string;
            msg: string;
        }>;
    };
}

// 2. Создаем собственный Type Guard для проверки структуры ошибки
function isCustomApiError(error: unknown): error is CustomApiError {
    return (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        'data' in error &&
        typeof (error as any).data === 'object' &&
        (error as any).data !== null
    );
}

export const useSearchFilterPagination = (url: string) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const page = Number(searchParams.get('page')) || 1
    const urlSearch = searchParams.get('search') || ''
    const urlFilter = searchParams.get('filter') || ''
    const limit = Number(searchParams.get('limit')) || 24

    const {
        register,
        watch,
        reset,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FilterFormValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            search: urlSearch,
            filter: urlFilter,
        },
        mode: 'onChange',
        resetOptions: {
            keepDefaultValues: false,
        }
    })

    const currentSearch = watch('search');
    const currentFilter = watch('filter');
    const debouncedSearch = useDebounce(currentSearch, 500)

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(newPage));
        setSearchParams(params);
    };

    const handleLimitChange = (newLimit: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('limit', String(newLimit));
        params.set('page', '1')
        setSearchParams(params)
    };

    const handleReset = () => {
        reset()
        clearErrors()
        setValue('search', '')
        setSearchParams({ page: '1', limit: String(limit), search: '' })
    }

    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search)

        const oldSearch = currentParams.get('search') || ''
        const oldFilter = currentParams.get('filter') || ''

        const isSearchChanged = debouncedSearch !== oldSearch
        const isFilterChanged = currentFilter !== oldFilter

        if (isSearchChanged || isFilterChanged) {
            currentParams.set('page', '1');

            if (debouncedSearch) currentParams.set('search', debouncedSearch)
            else currentParams.delete('search')

            if (currentFilter) currentParams.set('filter', currentFilter)
            else currentParams.delete('filter')

            setSearchParams(currentParams, { replace: true })
        }
    }, [debouncedSearch, currentFilter, setSearchParams])

    const hasErrors = !!errors.search

    const { data, isFetching, error } = useFilterSearchQuery(
        { url, page, limit, search: debouncedSearch, filter: currentFilter },
        {
            refetchOnMountOrArgChange: true,
            skip: hasErrors,
        }
    )

    // 3. Используем кастомный Type Guard в useEffect
    useEffect(() => {
        if (error && isCustomApiError(error) && error.status === 422) {
            const errorList = error.data.error;

            if (Array.isArray(errorList)) {
                errorList.forEach((err) => {
                    const fieldKey = err.key as keyof FilterFormValues;
                    
                    setError(fieldKey, {
                        type: "server",
                        message: err.msg,
                    });
                });
            }
        }
    }, [error, setError])

    const result = data?.result

    return {
        page, limit, result, isFetching,
        register,
        errors,
        handlePageChange,
        handleLimitChange,
        handleReset,
    }
}
