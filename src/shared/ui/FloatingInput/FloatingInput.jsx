export function FloatingInput({ id, type = "text", label, required = false }) {
  return (
    <div className="input-container floating">
      <input type={type} id={id} placeholder=" " />
      <label htmlFor={id}>
        {label}{required ? <span className="required">*</span> : null}
      </label>
    </div>
  );
}
