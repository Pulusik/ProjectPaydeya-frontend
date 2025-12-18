import React from "react";

export function FloatingInput({
  id,
  type = "text",
  label,
  required = false,
  value = "",
  onChange = () => {},
  disabled = false
}) {
  return (
    <div className="input-container floating">
      <input 
        type={type} 
        id={id} 
        placeholder=" "
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={id}>
        {label}{required ? <span className="required">*</span> : null}
      </label>
    </div>
  );
}