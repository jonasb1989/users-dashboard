import "./index.less";

const Layout = (props) => {
  const { header, children } = props;
  return (
    <div className="users-dashboard">
      <div className="users-dashboard__header">{header}</div>
      <div className="users-dashboard__container">{children}</div>
    </div>
  );
};

export default Layout;
