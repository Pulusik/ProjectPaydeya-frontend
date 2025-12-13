import { useState } from "react";

export function PasswordInput({ id, label, required = false }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="input-container floating password-container">
      <input type={visible ? "text" : "password"} id={id} placeholder=" " />
      <label htmlFor={id}>
        {label}{required ? <span className="required">*</span> : null}
      </label>

      <span className="password-toggle" onClick={() => setVisible(v => !v)}>
        <img
          src={visible ? "/img/svg/eye.svg" : "/img/svg/Closedeye.svg"}
          alt="toggle"
          className="eye-icon"
        />
      </span>
    </div>
  );
}
