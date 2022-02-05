import { useEffect, useReducer } from "react";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addUsers, deleteUser } from "redux/users";
import { getUsers } from "services/users";
import setStateReducer from "hooks/setStateReducer";
import Table from "components/Table";
import Button from "components/Button";
import RemoveUserModal from "./components/RemoveUserModal";

import "./index.less";

const initialState = {
  isModalDeleteUserVisible: false,
  selectedUserToDelete: null,
};

const UsersTable = () => {
  const [state, setState] = useReducer(setStateReducer, initialState);
  const users = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const { isModalDeleteUserVisible, selectedUserToDelete } = state;

  const setupUsersData = async () => {
    const response = await getUsers();
    dispatch(addUsers(response));
  };

  useEffect(() => {
    if (!users.length) {
      setupUsersData();
    }
  }, []); // eslint-disable-line

  return (
    <div className="users-table">
      <div className="users-table__actions">
        <h2>User list</h2>
        <Button type="primary">
          <Link to="/users">Add new</Link>
        </Button>
      </div>
      <div className="users-table__list">
        <Table
          data={users}
          columns={[
            {
              title: "id",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Username",
              dataIndex: "username",
              key: "username",
            },
            { title: "Email", dataIndex: "email", key: "email" },
            {
              title: "City",
              key: "city",
              dataIndex: "city",
              render: (text, record) => <>{record?.address?.city}</>,
            },
            {
              title: "Edit",
              key: "edit",
              dataIndex: "edit",
              render: (text, record) => (
                <Button variant="success">
                  <Link to={`/users/${record.id}`}>Edit</Link>
                </Button>
              ),
            },
            {
              title: "Delete",
              key: "delete",
              dataIndex: "delete",
              render: (text, record) => (
                <Button
                  variant="danger"
                  onClick={() => {
                    setState({
                      selectedUserToDelete: record,
                      isModalDeleteUserVisible: true,
                    });
                  }}
                >
                  Delete
                </Button>
              ),
            },
          ]}
        />
      </div>

      <RemoveUserModal
        isVisible={isModalDeleteUserVisible}
        selectedUserToDelete={selectedUserToDelete}
        onConfirm={() => {
          dispatch(deleteUser(selectedUserToDelete.id));
          setState({
            selectedUserToDelete: null,
            isModalDeleteUserVisible: false,
          });
        }}
        onClose={() =>
          setState({
            selectedUserToDelete: null,
            isModalDeleteUserVisible: false,
          })
        }
      />
    </div>
  );
};

export default UsersTable;
