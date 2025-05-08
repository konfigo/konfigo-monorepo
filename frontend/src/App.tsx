import { FC, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Editor, Login, NoMatch } from "@/pages";
import { ConfigProvider } from "antd";
import { Account, AuthContext } from "./contexts/AuthContext";
import { useQuery } from "@apollo/client";
import { MeQueryDocument } from "./queries/me.query";
import { MeQuery } from "./graphql/graphql";
import { LOCAL_STORAGE_KEYS } from "./util/constants";
import { Onboard } from "./pages/Onboard/Onboard";
import { Logout } from "./pages/Logout/Logout";
import { Users } from "./pages/Users/Users";

const App: FC = () => {
  const [me, setMe] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  const { data: meData, loading: meLoading } = useQuery<MeQuery>(
    MeQueryDocument,
    {
      skip: !localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN),
      onCompleted: () => {
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    },
  );

  useEffect(() => {
    if (!meLoading && meData) {
      setMe({
        id: meData.me.id,
        username: meData.me.username,
      });
    }
  }, [meData, meLoading]);

  return (
    <>
      <AuthContext.Provider
        value={{
          loading,
          me: me || undefined,
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#37323e",
              borderRadius: 5,
              fontFamily: "Inter, sans-serif",
            },
          }}
        >
          <Routes>
            <Route path="*" element={<NoMatch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboard" element={<Onboard />} />
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Editor />} />
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </ConfigProvider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
