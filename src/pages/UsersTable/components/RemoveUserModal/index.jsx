import Modal from "components/Modal";
import Button from "components/Button";

const RemoveUserModal = (props) => {
  const { isVisible, onConfirm, onClose, selectedUserToDelete } = props;

  return (
    <Modal
      title="Delete"
      isVisible={isVisible}
      onClose={onClose}
      onConfirm={onConfirm}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>,
      ]}
    >
      Do you really want to delete the user {selectedUserToDelete?.name} ?
    </Modal>
  );
};

export default RemoveUserModal;
