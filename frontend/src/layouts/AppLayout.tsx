import { AuthContext } from "@/contexts/AuthContext";
import Footer from "@/shared/components/Footer/Footer";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  const { me, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!me && !loading) {
      window.location.href = "/login";
    }
  }, [me, loading]);

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <div
        className={[
          "transition-opacity ease-in-out z-2 fixed w-full h-full bg-white flex flex-col items-center justify-center",
          loading ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    </div>
  );
};

export default Layout;
