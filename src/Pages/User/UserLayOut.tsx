type Props = {
  children?: React.ReactNode;
}

const UserLayOut = ({ children }: Props) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="w-full md:w-2xl lg:w-3xl bg-base-100 p-4">
        {children}
      </div>
    </div>
  )
}

export default UserLayOut
