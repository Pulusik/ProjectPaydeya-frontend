import { Link } from "react-router-dom";
import { PublicHeader } from "../../../../widgets/public-header";
import { WelcomeBlock } from "../../../../widgets/welcome-block";
import { FloatingInput } from "../../../../shared/ui/FloatingInput/FloatingInput";
import { PasswordInput } from "../../../../shared/ui/PasswordInput/PasswordInput";

export function RegistrationPage() {
  return (
    <>
      <PublicHeader />

      <div className="main-container">
        <div className="registration-section">
          <div className="registration-title">Регистрация</div>

          <form className="registration-form">
            <FloatingInput id="lastname" label="Фамилия" required />
            <FloatingInput id="firstname" label="Имя" required />
            <FloatingInput id="patronymic" label="Отчество (при наличии)" />
            <FloatingInput id="email" type="email" label="Email" required />

            <PasswordInput id="password" label="Пароль" required />
            <PasswordInput id="confirm-password" label="Подтвердите пароль" required />
          </form>

          <div className="checkbox-yes">
            <input type="checkbox" required />
            <label>
              Соглашаюсь на обработку моих персональных данных в соответствии с{" "}
              <a href="#">Политикой конфиденциальности</a> и принимаю условия{" "}
              <a href="#">Лицензионного соглашения</a>
              <span className="required">*</span>
            </label>
          </div>

          <div className="but-reg">
            <button type="submit" className="submit-btn">Зарегистрироваться</button>

            <div className="login-link">
              Уже есть аккаунт? <Link to="/login">Войти</Link>
            </div>
          </div>
        </div>

        <WelcomeBlock />
      </div>
    </>
  );
}
