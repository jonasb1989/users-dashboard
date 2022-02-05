import { useReducer, useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { addUser, editUser } from "redux/users";
import setStateReducer from "hooks/setStateReducer";
import Button from "components/Button";

import "./index.less";

const initialState = {
  selectedUserToEdit: null,
};

const UsersForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams();
  const [state, setState] = useReducer(setStateReducer, initialState);
  const users = useSelector((state) => state.users.value);
  const [form] = Form.useForm();
  const { selectedUserToEdit } = state;

  const onFinish = (values) => {
    if (selectedUserToEdit) {
      dispatch(editUser({ ...selectedUserToEdit, ...values }));
    } else {
      dispatch(addUser(values));
    }

    notification.open({
      description: `User ${
        selectedUserToEdit ? "edited" : "created"
      } with successs`,
      duration: 3,
    });
    history.push("/");
  };

  useEffect(() => {
    if (userId) {
      const user = users.find(
        (user) => user.id.toString() === userId.toString()
      );
      setState({ selectedUserToEdit: user });
      form.setFieldsValue({ name: user.name, email: user.email });
    }
  }, []); // eslint-disable-line

  return (
    <div className="users-table">
      <div className="users-table__actions">
        <h2>Form</h2>
      </div>
      <div className="users-table__list">
        <Form form={form} autoComplete="off" onFinish={onFinish} noValidate>
          <div className="users-table__form">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Field should be email type" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              padding: "15px 0",
            }}
          >
            <Button type="primary" onClick={() => history.push("/")}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UsersForm;
