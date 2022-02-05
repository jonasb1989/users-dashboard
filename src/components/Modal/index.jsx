import { Modal as AntdModal } from "antd";

const Modal = (props) => {
  const { title, isVisible, onConfirm, onClose, children } = props;

  return (
    <AntdModal
      title={title}
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
