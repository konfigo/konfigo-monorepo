import Footer from "@/shared/components/Footer/Footer";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      {/* <LayoutHeader /> */}
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
