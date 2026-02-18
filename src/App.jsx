// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/login/ui/LoginPage';
import { RegistrationPage } from './pages/auth/registration/ui/RegistrationPage';
import { ChoiceRolePage } from './pages/auth/choice-role/ui/ChoiceRolePage';
import { CreateMaterialPage } from './pages/material-editor/CreateMaterialPage/CreateMaterialPage';
import { TeacherMainPage } from './pages/teacher/main/ui/TeacherMainPage';
import { StudentMainPage } from './pages/student/main/ui/StudentMainPage';
import { PublicHeader } from './widgets/public-header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={
            <>
              <PublicHeader />
              <div className="main-content">
                <h1>Добро пожаловать в Пайдейю</h1>
                <p>Образовательная платформа нового поколения</p>
                <div className="action-buttons">
                  <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                      }}
                      className="btn btn-primary"
                    >
                      Войти
                    </button>

                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.href = '/choice-role';
                      }}
                      className="btn btn-secondary"
                    >
                      Регистрация
                    </button>
                </div>
              </div>
            </>
          } />
          
          {/* Авторизация */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/choice-role" element={<ChoiceRolePage />} />
          
          {/* Учитель */}
          <Route path="/teacher/dashboard" element={<TeacherMainPage />} />

          {/* Студент */}
          <Route path="/student/dashboard" element={<StudentMainPage />} />
          
          {/* Редактор материалов */}
          <Route path="/materials/new" element={<CreateMaterialPage />} />
          
          {/* 404 страница */}
          <Route path="*" element={
            <div className="not-found">
              <h1>404 - Страница не найдена</h1>
              <a href="/" className="btn btn-primary">На главную</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
