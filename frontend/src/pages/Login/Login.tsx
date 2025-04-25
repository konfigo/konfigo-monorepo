import { AuthContext } from "@/contexts/AuthContext";
import { LoginInput, LoginMutation } from "@/graphql/graphql";
import { LoginMutationDocument } from "@/queries/login.mutation";
import { LOCAL_STORAGE_KEYS } from "@/util/constants";
import { useMutation } from "@apollo/client";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useContext, useEffect } from "react";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;

    if (!username || !password) {
      return;
    }

    const { data } = await login({
      variables: { username, password },
    });

    console.log(data);

    if (data?.login.token) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, data?.login.token);
      window.location.href = "/";
    }
  };

  const [login] = useMutation<LoginMutation, LoginInput>(LoginMutationDocument);

  const { me, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!!me && !loading) {
      window.location.href = "/";
    }
  }, [me, loading]);

  return (
    <>
      <div className="flex flex-col h-screen overflow-x-hidden">
        {/* <LayoutHeader /> */}
        <main className="flex-grow">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-5">
              <img src="/images/konfigo.svg" width={100} />
            </div>

            <Form
              name="Login"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item<FieldType>
                name="remember"
                valuePropName="checked"
                label={null}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
