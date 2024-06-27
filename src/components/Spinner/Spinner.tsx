export const Spinner = ({ text = "", size = "5em" }) => {
  const header = text ? <h4>{text}</h4> : null;
  return (
    <div>
      {header}
      <div style={{ height: size, width: size }} />
    </div>
  );
};
