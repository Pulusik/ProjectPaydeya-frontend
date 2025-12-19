import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function PublicHeader() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');

      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [location]);

  // Функция для очистки localStorage при клике на кнопки авторизации
  const clearAuthAndNavigate = (path) => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = path;
  };

  // Если загружается - показываем пустой хедер
  if (isLoading) {
    return (
      <div className="header">
        <div className="logo">
          <img src="/img/svg/logo.svg" alt="Logo" />
        </div>
        <div className="header-buttons"></div>
      </div>
    );
  }

  // === ОПРЕДЕЛЯЕМ ТИП СТРАНИЦЫ ===

  // Страницы где должен показываться пользователь (дашборды, редактор)
  const userPages = [
    '/teacher/dashboard',
    '/student/dashboard',
    '/materials/new',
    '/materials/', // все материалы (просмотр, редактирование)
    '/profile'
  ];

  const isUserPage = userPages.some(page => location.pathname.startsWith(page));

  // Страницы авторизации
  const isLoginPage = location.pathname === '/login';
  const isChoiceRolePage = location.pathname === '/choice-role';
  const isRegistrationPage = location.pathname === '/registration';

  // 1. Если это страница пользователя (дашборд, редактор и т.д.)
  if (isUserPage) {
    // Должен быть авторизованный пользователь
    if (!user) {
      // Если пользователь не авторизован, но на странице где нужна авторизация
      // Можно перенаправить или показать сообщение
      console.warn('User not authenticated on protected page:', location.pathname);
      // window.location.href = '/login'; // раскомментируйте если нужно перенаправлять
    }

    return (
      <div className="header">
        <a href="/"><div className="logo">
          <img src="/img/svg/logo.svg" alt="Logo" />
        </div></a>

        {user ? (
          // Пользователь авторизован - показываем информацию
          <div className="user-info" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontWeight: '500',
                fontSize: '0.95rem',
                color: '#333'
              }}>
                {user.fullName || 'Пользователь'}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: '#666',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span>{user.email}</span>
                <span style={{
                  background: user.role === 'teacher' ? '#4CAF50' : '#2196F3',
                  color: 'white',
                  padding: '2px 6px',
                  borderRadius: '8px',
                  fontSize: '0.7rem'
                }}>
                  {user.role === 'teacher' ? 'Преподаватель' : 'Студент'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = '/';
              }}
              style={{
                padding: '6px 12px',
                background: '#f5f5f5',
                color: '#666',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          // Пользователь не авторизован, но на странице где нужна авторизация
          // Пустой блок для выравнивания
          <div style={{ width: '150px' }}></div>
        )}
      </div>
    );
  }

  // 2. Страница ВХОДА (/login) - показываем только "Регистрация"
  if (isLoginPage) {
    return (
      <div className="header">
        <a href="/"><div className="logo">
          <img src="/img/svg/logo.svg" alt="Logo" />
        </div></a>

        <div className="header-buttons">
          {/* Только кнопка Регистрация */}
          <a
            href="/choice-role"
            className="btn-register"
            onClick={(e) => {
              e.preventDefault();
              clearAuthAndNavigate('/choice-role');
            }}
          >
            Регистрация
          </a>
        </div>
      </div>
    );
  }

  // 3. Страница ВЫБОРА РОЛИ (/choice-role) - показываем только "Вход"
  if (isChoiceRolePage) {
    return (
      <div className="header">
        <a href="/"><div className="logo">
          <img src="/img/svg/logo.svg" alt="Logo" />
        </div></a>

        <div className="header-buttons">
          {/* Только кнопка Вход */}
          <a
            href="/login"
            className="btn-login"
            onClick={(e) => {
              e.preventDefault();
              clearAuthAndNavigate('/login');
            }}
          >
            Вход
          </a>
        </div>
      </div>
    );
  }

  // 4. Страница РЕГИСТРАЦИИ (/registration) - показываем только "Вход"
  if (isRegistrationPage) {
    return (
      <div className="header">
        <a href="/"><div className="logo">
          <img src="/img/svg/logo.svg" alt="Logo" />
        </div></a>

        <div className="header-buttons">
          {/* Только кнопка Вход */}
          <a
            href="/login"
            className="btn-login"
            onClick={(e) => {
              e.preventDefault();
              clearAuthAndNavigate('/login');
            }}
          >
            Вход
          </a>
        </div>
      </div>
    );
  }

  // 5. Стандартный хедер с обеими кнопками (главная страница и другие)
  return (
    <div className="header">
      <a href="/"><div className="logo">
        <img src="/img/svg/logo.svg" alt="Logo" />
      </div></a>

      <div className="header-buttons">
        {/* Кнопка Регистрация */}
        <a
          href="/choice-role"
          className="btn-register"
          onClick={(e) => {
            e.preventDefault();
            clearAuthAndNavigate('/choice-role');
          }}
        >
          Регистрация
        </a>

        {/* Кнопка Вход */}
        <a
          href="/login"
          className="btn-login"
          onClick={(e) => {
            e.preventDefault();
            clearAuthAndNavigate('/login');
          }}
        >
          Вход
        </a>
      </div>
    </div>
  );
}