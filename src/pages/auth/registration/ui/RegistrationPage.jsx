// RegistrationPage.jsx
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { PublicHeader } from "../../../../widgets/public-header";
import { WelcomeBlock } from "../../../../widgets/welcome-block";
import { FloatingInput } from "../../../../shared/ui/FloatingInput/FloatingInput";
import { PasswordInput } from "../../../../shared/ui/PasswordInput/PasswordInput";
import { translateError, validationMessages } from "../../../../utils/translations"; // ← ИМПОРТ

export function RegistrationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "student";

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    patronymic: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE = '/api';

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value
    }));
    if (error) setError("");
  };

  const validateForm = () => {
    const { lastName, firstName, email, password, confirmPassword, agreeToTerms } = formData;

    if (!lastName.trim()) {
      setError(validationMessages.lastNameRequired);
      return false;
    }

    if (!firstName.trim()) {
      setError(validationMessages.nameRequired);
      return false;
    }

    if (!email.trim()) {
      setError(validationMessages.emailRequired);
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(validationMessages.emailInvalid);
      return false;
    }

    if (!password.trim()) {
      setError(validationMessages.passwordRequired);
      return false;
    }

    if (password.length < 6) {
      setError(validationMessages.passwordTooShort);
      return false;
    }

    if (password !== confirmPassword) {
      setError(validationMessages.passwordsNotMatch);
      return false;
    }

    if (!agreeToTerms) {
      setError(validationMessages.agreeToTermsRequired);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const fullName = `${formData.lastName} ${formData.firstName} ${formData.patronymic || ""}`.trim();

      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: fullName,
          role: role
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/");
      } else {
        // Используем общую функцию перевода
        const translatedError = translateError(data.error || "Ошибка регистрации");
        setError(translatedError);
      }
    } catch (err) {
      console.error("Registration error:", err);
      const translatedError = translateError(err.message || "Ошибка соединения с сервером");
      setError(translatedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />

      <div className="main-container">
        <div className="registration-section">
          <div className="registration-title">
            Регистрация {role === "teacher" ? "преподавателя" : "студента"}
          </div>

          {error && (
            <div className="error-message" style={{
              color: "red",
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: "#ffe6e6",
              borderRadius: "5px",
              border: "1px solid #ff4444"
            }}>
              ⚠ {error}
            </div>
          )}

          <form className="registration-form" onSubmit={handleSubmit}>
            <FloatingInput
              id="lastName"
              label="Фамилия"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <FloatingInput
              id="firstName"
              label="Имя"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <FloatingInput
              id="patronymic"
              label="Отчество (при наличии)"
              value={formData.patronymic}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <FloatingInput
              id="email"
              type="email"
              label="Email"
              required
              value={formData.email}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <PasswordInput
              id="password"
              label="Пароль"
              required
              value={formData.password}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <PasswordInput
              id="confirmPassword"
              label="Подтвердите пароль"
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <div className="checkbox-yes">
              <input
                type="checkbox"
                required
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <label htmlFor="agreeToTerms">
                Соглашаюсь на обработку моих персональных данных в соответствии с{" "}
                <a href="#" style={{ color: "#4A6FFF" }}>Политикой конфиденциальности</a> и принимаю условия{" "}
                <a href="#" style={{ color: "#4A6FFF" }}>Лицензионного соглашения</a>
                <span className="required">*</span>
              </label>
            </div>

            <div className="but-reg">
              <button
                type="submit"
                className="submit-btn"
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer"
                }}
              >
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
              </button>

              <div className="login-link">
                Уже есть аккаунт? <Link to="/login" style={{ color: "#4A6FFF" }}>Войти</Link>
              </div>
            </div>
          </form>
        </div>

        <WelcomeBlock />
      </div>
    </>
  );
}