import { Modal as AntdModal } from "antd";

const Modal = (props) => {
  const { isVisible, onConfirm, onClose, children } = props;

  return (
    <AntdModal
      visible={isVisible}
      onOk={onConfirm}
      onCancel={onClose}
      {...props}
    >
      {children}
    </AntdModal>
  );
};

export default Modal;
