const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-screen flex justify-center items-center bg-violet-800">
      {children}
    </div>
  );
};

export default AuthLayout;
