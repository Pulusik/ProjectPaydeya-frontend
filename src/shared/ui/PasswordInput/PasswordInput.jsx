import { useState } from "react";

export function PasswordInput({
  id,
  label,
  required = false,
  value = "",
  onChange = () => {},
  disabled = false
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-container floating password-container">
      <input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder=" "
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      <label htmlFor={id}>
        {label}{required ? <span className="required">*</span> : null}
      </label>
      <span
        className="password-toggle"
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: "pointer" }}
      >
        <img
          src={showPassword ? "/img/svg/eye.svg" : "/img/svg/Closedeye.svg"}
          alt={showPassword ? "Скрыть пароль" : "Показать пароль"}
          className="eye-icon"
        />
      </span>
    </div>
  );
}