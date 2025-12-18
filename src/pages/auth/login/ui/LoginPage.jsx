// LoginPage.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PublicHeader } from "../../../../widgets/public-header";
import { WelcomeBlock } from "../../../../widgets/welcome-block";
import { FloatingInput } from "../../../../shared/ui/FloatingInput/FloatingInput";
import { PasswordInput } from "../../../../shared/ui/PasswordInput/PasswordInput";
import { translateError, validationMessages } from "../../../../utils/translations"; // ← ИМПОРТ

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
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
    const { email, password } = formData;

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
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        navigate("/");
      } else {
        // Используем общую функцию перевода
        const translatedError = translateError(data.error || "Ошибка входа");
        setError(translatedError);
      }
    } catch (err) {
      console.error("Login error:", err);
      const translatedError = translateError(err.message || "Ошибка соединения с сервером");
      setError(translatedError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = prompt("Введите ваш email для восстановления пароля:");

    if (!email) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Инструкции по восстановлению пароля отправлены на ваш email");
      } else {
        const translatedError = translateError(data.error || "Ошибка отправки запроса");
        alert(translatedError);
      }
    } catch (err) {
      const translatedError = translateError(err.message || "Ошибка соединения с сервером");
      alert(translatedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />

      <div className="main-container">
        <div className="auth-section">
          <div className="auth-title">Авторизация</div>

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

          <form onSubmit={handleSubmit}>
            <FloatingInput
              id="email"
              type="email"
              label="e-mail"
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

            <div className="password-link">
              Забыли пароль?{" "}
              <button
                type="button"
                onClick={handleForgotPassword}
                style={{
                  background: "none",
                  border: "none",
                  color: "#4A6FFF",
                  cursor: "pointer",
                  textDecoration: "underline",
                  fontSize: "inherit"
                }}
                disabled={isLoading}
              >
                Восстановить
              </button>
            </div>

            <label className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isLoading}
              />
              Запомнить меня
            </label>

            <div className="auth-actions">
              <button
                type="submit"
                className="login-btn"
                disabled={isLoading}
                style={{
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? "not-allowed" : "pointer"
                }}
              >
                {isLoading ? "Вход..." : "Войти"}
              </button>

              <div className="register-link">
                Ещё нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
              </div>
            </div>
          </form>
        </div>

        <WelcomeBlock />
      </div>
    </>
  );
}