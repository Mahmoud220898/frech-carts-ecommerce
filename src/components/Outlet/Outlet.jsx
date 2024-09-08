import React, { useEffect, useState } from "react";
import styles from "./Outlet.module.css";
export default function Outlet() {
  let [count, setCount] = useState(0);
  useEffect(() => {}, []);
  return <div>outlet</div>;
}
