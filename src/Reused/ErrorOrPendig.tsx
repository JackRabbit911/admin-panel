import Loading from "./Loading";
import ErrorCmp from "./ErrorCmp";
import type { ServerError } from "../shared/types";

type ResponseStatus = {
  isLoading: boolean;
  isError: boolean;
  err: ServerError;
}

type Props = {
  responseStatus?: ResponseStatus;
  children?: React.ReactNode;
}

const ErrorOrPending = ({ responseStatus, children }: Props) => {  
  if (responseStatus) {
    const { isLoading, isError, err } = responseStatus
    const status = (err && 'status' in err) ? err.status : 0

    return (
      <>
        {isLoading ? <Loading /> : (isError && status !== 422 ? <ErrorCmp status={status} /> : children)}
      </>
    )
  }

  return null
}

export default ErrorOrPending
