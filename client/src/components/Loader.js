const Loader = ({ message }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center gap-2"
      style={{ height: '30vh' }}
    >
      <div className="loader"></div>
      <p className="text-center mb-0 ml-2">{message}</p>
    </div>
  );
};

export default Loader;
