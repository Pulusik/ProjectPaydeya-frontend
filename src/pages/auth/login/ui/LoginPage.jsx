import { Link } from "react-router-dom";
import { PublicHeader } from "../../../../widgets/public-header";
import { WelcomeBlock } from "../../../../widgets/welcome-block";
import { FloatingInput } from "../../../../shared/ui/FloatingInput/FloatingInput";
import { PasswordInput } from "../../../../shared/ui/PasswordInput/PasswordInput";

export function LoginPage() {
  return (
    <>
      <PublicHeader />

      <div className="main-container">
        <div className="auth-section">
          <div className="auth-title">Авторизация</div>

          <form>
            <FloatingInput id="email" type="email" label="e-mail" required />
            <PasswordInput id="password" label="Пароль" required />

            <div className="password-link">
              Забыли пароль? <a href="#">Восстановить</a>
            </div>

            <label className="remember-me">
              <input type="checkbox" />
              Запомнить меня
            </label>
          </form>

          <div className="auth-actions">
            <button type="submit" className="login-btn">Войти</button>

            <div className="register-link">
              Ещё нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
            </div>
          </div>
        </div>

        <WelcomeBlock />
      </div>
    </>
  );
}
