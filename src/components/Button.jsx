import { VscSignOut } from "react-icons/vsc";
import { sessionAuth } from "../context/AuthContext";

function Button() {
  const { signOut } = sessionAuth();

  const handleClick = () => {
    signOut();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-red-500 transition"
    >
      <VscSignOut /> Sign Out
    </button>
  );
}

export default Button;
