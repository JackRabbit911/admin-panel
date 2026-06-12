import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import Loading from "./Loading";
import ErrorCmp from "./ErrorCmp";

type ResponseStatus = {
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

type Props = {
  responseStatus?: ResponseStatus;
  children?: React.ReactNode;
}

const ErrorOrPending = ({ responseStatus, children }: Props) => {  
  if (responseStatus) {
    const { isLoading, isError, error } = responseStatus
    const status = (error && 'status' in error) ? error.status : 0

    return (
      <>
        {isLoading ? <Loading /> : (isError ? <ErrorCmp status={status} /> : children)}
      </>
    )
  }

  return null
}

export default ErrorOrPending
