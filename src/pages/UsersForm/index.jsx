import { useReducer, useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { addUser, editUser } from "redux/users";
import setStateReducer from "hooks/setStateReducer";
import Layout from "components/Layout";
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
    <Layout header={<h2>Form</h2>}>
      <Form form={form} autoComplete="off" onFinish={onFinish} noValidate>
        <div className="users-form">
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
        <div className="users-form_footer">
          <Button onClick={() => history.push("/")}>Cancel</Button>
          <Button variant="success" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
};

export default UsersForm;
