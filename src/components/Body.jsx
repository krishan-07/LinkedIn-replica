export const Body = ({ children }) => {
  return (
    <div className="container-md">
      <div className="row mt-4">{children}</div>
    </div>
  );
};

export const Column = ({ className, children }) => {
  return <div className={`${className}`}>{children}</div>;
};
