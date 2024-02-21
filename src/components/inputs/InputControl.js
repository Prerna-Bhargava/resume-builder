import React from "react";

import styles from "./InputControl.module.css";

function InputControl({ label, errormsg ,...props }) {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input type="text" {...props} />
      <div style={{ color: 'red' }}>{errormsg}</div>
    </div>
  );
}

export default InputControl;