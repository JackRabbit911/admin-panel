import { api, useGetQuery, usePostMutation } from "shared/api";
import type { ApiArg } from "shared/api/tags";

export function createGetHook<TResponse>(url: string) {
    return () => {
        const result = useGetQuery(url);
        return {
            ...result,
            data: result.data as TResponse | undefined,
        };
    };
}

export function createMutationHook<TResponse, TBody = unknown>(
    url: string, 
    method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST'
) {
    return () => {
        const [trigger, result] = usePostMutation();

        const wrappedTrigger = async (body: TBody) => {
            const response = await trigger({ url, method, body }).unwrap();
            return response as TResponse;
        };

        return [
            wrappedTrigger,
            {
                ...result,
                data: result.data as TResponse | undefined,
            }
        ] as const;
    };
}

export function updateCache<TData>(
  args: ApiArg,
  recipe: (draftResult: TData) => void
) {
  return api.util.updateQueryData('get', args, (draft) => {
    recipe(draft as TData)
  })
}
