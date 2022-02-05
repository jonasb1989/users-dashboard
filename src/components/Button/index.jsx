import { Button as AntdButton } from "antd";

import "./index.less";

const Button = (props) => {
  const { children, variant } = props;
  return (
    <AntdButton {...props} className={variant}>
      {children}
    </AntdButton>
  );
};

export default Button;
