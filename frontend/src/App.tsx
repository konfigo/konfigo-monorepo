import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import { Editor, Login, NoMatch } from "@/pages";
import { ConfigProvider } from "antd";

const App: FC = () => {
  return (
    <>
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
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Editor />} />
            <Route path="*" element={<NoMatch />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </>
  );
};

export default App;
