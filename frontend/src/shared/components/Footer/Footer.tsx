import { AuthContext } from "@/contexts/AuthContext";
import { APP_VERSION } from "@/util/constants";
import { useContext } from "react";

const Footer: React.FC = () => {
  const { me } = useContext(AuthContext);

  return (
    <>
      <div className="border-t border-gray-300 bg-gray-100 flex gap-2 py-1 px-1 text-xs text-gray-500">
        <div className="flex-grow px-1">
          {me ? <span>{me.username}</span> : <span>Not logged in</span>}
        </div>
        <div className="px-1">
          <span className="">Konfigo v{APP_VERSION}</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
