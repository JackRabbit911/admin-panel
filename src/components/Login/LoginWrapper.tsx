type Props = {
  children: React.ReactNode;
};

const LoginWrapper = ({ children }: Props) => (
  <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        {children}
      </div>
    </div>
  </div>
);

export default LoginWrapper;
