import React from "react";
import styles from "./footer.module.scss";

const MyFooter = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.footer}>
      Copyright © {year} - ActivPouss by <a className="text-primary ms-3" href="https://www.coup2pouce.sn">Coup2Pouce</a>.
    </div>
  );
};

export default MyFooter;
