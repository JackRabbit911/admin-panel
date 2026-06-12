type Props = {
  status: number | string | undefined;
}

const getReasonPhrase = (status: number | string | undefined) => {
  switch (Number(status)) {
    case 400:
      return '400 | Bad request'
    case 401:
      return '401 | Unauthorized'
    case 403:
      return '403 | Forbidden'
    case 404:
      return '404 | Not found'
    case 405:
      return '405 | Method not allowed'
    case 500:
      return '500 | Internal server error'
    case 503:
      return '503 | Service Unavailable'
    case 555:
      return '555 | Invalid input data'
    default:
      console.log(status)
      return 'Unknown error'
  }
}

const ErrorCmp = ({ status }: Props) => {
  return (
    <div className="h-96 flex flex-col justify-center">
      <h1 className="text-center text-3xl">
        {getReasonPhrase(status)}
      </h1>
    </div>
  )
}

export default ErrorCmp
