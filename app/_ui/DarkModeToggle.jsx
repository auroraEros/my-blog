import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import { useDarkMode } from "../_context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <HiOutlineSun className="stroke-primary-900 hover:stroke-primary-700" />
      ) : (
        <HiOutlineMoon className="stroke-primary-900 hover:stroke-primary-700" />
      )}
    </button>
  );
}

export default DarkModeToggle;
