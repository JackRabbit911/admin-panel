type Props = {
  status?: number | string;
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

const Error = ({ status = 200 }: Props) => {
  const code = Number(status)

  if (code >= 400) {
    return (
      <div className="flex flex-col justify-center h-4/5">
        <h1 className="text-3xl text-center">
          {getReasonPhrase(status)}
        </h1>
      </div>
    )
  }

  return null
}

export default Error
