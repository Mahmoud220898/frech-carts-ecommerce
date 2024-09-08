import React, { useEffect, useState } from "react";
import styles from "./DarkMode.module.css";
import { toast } from "react-toastify";

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (darkMode) {
    toast.success("Dark Mode is ON 👏", {
      style: {
        borderRadius: "500px",
        background: "#333",
        color: "#fff",
        position: "bottom-center",
      },
    });
  } else {
    toast.success("Light Mode is ON 👏", {
      style: {
        borderRadius: "500px",
        position: "bottom-center",
      },
    });
  }

  return (
    <div>
      <button
        className="text-orange-500 border-none"
        onClick={toggleDarkMode}
        style={{ fontSize: "28px" }}
      >
        {darkMode ? "🌚" : "🌞"}

        <span className={styles.toggleIcon} onClick={toggleDarkMode}></span>
      </button>
    </div>
  );
}
