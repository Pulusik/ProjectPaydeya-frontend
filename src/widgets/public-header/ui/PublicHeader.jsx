import { Link } from "react-router-dom";

export function PublicHeader() {
  return (
    <div className="header">
      <div className="logo">
        <img src="/img/svg/logo.svg" alt="Logo" />
      </div>

      <div className="header-buttons">
        <Link to="/registration/choose-role" className="btn-register">Регистрация</Link>
        <Link to="/login" className="btn-login">Вход</Link>
      </div>
    </div>
  );
}
