import {
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const items = [
    {
      label: "Configs",
      url: "/",
      icon: <FileTextOutlined style={{ fontSize: 18 }} />,
    },
    {
      label: "Users",
      url: "/users",
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
  ];

  const bottomItems = [
    {
      label: "Logout",
      url: "/logout",
      icon: <LogoutOutlined style={{ fontSize: 18 }} />,
    },
  ];

  const Item: React.FC<{
    label: string;
    url: string;
    icon: React.ReactNode;
  }> = ({ label, url, icon }) => {
    const location = useLocation();

    return (
      <Link to={url}>
        <div
          className={`aspect-square border-b flex ${
            location.pathname === url ? "bg-teal-900 text-white" : ""
          }`}
        >
          <div className="flex gap-2 flex-grow flex-col items-center justify-center">
            {icon}
            <span className="font-bold" style={{ fontSize: 10 }}>
              {label}
            </span>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="h-full flex flex-col w-16 border-r">
      <div className="flex flex-col flex-grow">
        {items.map((item) => (
          <Item icon={item.icon} label={item.label} url={item.url} />
        ))}
      </div>
      <div className="flex flex-col">
        {bottomItems.map((item) => (
          <Item icon={item.icon} label={item.label} url={item.url} />
        ))}
      </div>
    </div>
  );
};
