import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicHeader } from "../../../../widgets/public-header";

export function ChoiceRolePage() {
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <PublicHeader />

      <div className="role-container">
        <div className="role-title">Регистрация</div>

        <div className="roles-grid">
          <div className="role-card teacher-card">
            <div className="role-name">Я преподаватель</div>
            <div className="role-description">
              Хочу создавать материалы и <br />искать учеников
            </div>

            <img
              src="/img/svg/teacher.svg"
              alt="Преподаватель"
              className="role-icon"
              style={{ animation: hovered === "teacher" ? "floatHover 1.5s ease-in-out infinite" : "none" }}
            />

            <Link
              to="/registration"
              className="role-button teacher-btn"
              onMouseEnter={() => setHovered("teacher")}
              onMouseLeave={() => setHovered(null)}
            >
              Продолжить как преподаватель
              <img src="/img/svg/arrow-up-right.svg" alt="" className="btn-arrow" />
            </Link>
          </div>

          <div className="role-card student-card">
            <div className="role-name">Я Студент</div>
            <div className="role-description">
              Хочу учиться на платформе <br />и искать преподавателя
            </div>

            <img
              src="/img/svg/student.svg"
              alt="Ученик"
              className="role-icon"
              style={{ animation: hovered === "student" ? "floatHover 1.5s ease-in-out infinite" : "none" }}
            />

            <Link
              to="/registration"
              className="role-button student-btn"
              onMouseEnter={() => setHovered("student")}
              onMouseLeave={() => setHovered(null)}
            >
              Продолжить как студент
              <img src="/img/svg/arrow-up-right.svg" alt="" className="btn-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
