import React, { useEffect } from "react";

export const Logout: React.FC = () => {
  useEffect(() => {
    localStorage.clear();
    window.location.href = "/login";
  }, []);

  return <></>;
};
