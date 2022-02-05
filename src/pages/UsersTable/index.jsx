import { useEffect, useReducer } from "react";
import { notification } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addUsers, deleteUser } from "redux/users";
import { getUsers } from "services/users";
import setStateReducer from "hooks/setStateReducer";
import Layout from "components/Layout";
import Table from "components/Table";
import Button from "components/Button";
import RemoveUserModal from "./components/RemoveUserModal";

const initialState = {
  isModalDeleteUserVisible: false,
  selectedUserToDelete: null,
  isLoadingUsers: false,
};

const UsersTable = () => {
  const [state, setState] = useReducer(setStateReducer, initialState);
  const users = useSelector((state) => state.users.value);
  const dispatch = useDispatch();
  const { isModalDeleteUserVisible, selectedUserToDelete, isLoadingUsers } =
    state;

  const setupUsersData = async () => {
    setState({ isLoadingUsers: true });
    try {
      const response = await getUsers();
      dispatch(
        addUsers(response.sort((a, b) => a.username.localeCompare(b.username)))
      );
    } catch (error) {
      notification.open({
        description: error.message,
        duration: 3,
      });
    } finally {
      setState({ isLoadingUsers: false });
    }
  };

  useEffect(() => {
    if (!users.length) {
      setupUsersData();
    }
  }, []); // eslint-disable-line

  return (
    <Layout
      header={
        <>
          <h2>User list</h2>
          <Button type="primary">
            <Link to="/users">Add new</Link>
          </Button>
        </>
      }
    >
      <Table
        sortOrder="ascend"
        loading={isLoadingUsers}
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
            sorter: (a, b) => a?.username.localeCompare(b?.username),
            sortDirections: ["ascend", "descend", "ascend"],
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
              <Button variant="warning">
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
    </Layout>
  );
};

export default UsersTable;
