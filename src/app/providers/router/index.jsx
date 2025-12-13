import { createBrowserRouter } from "react-router-dom";

import { PublicHomePage } from "../../../pages/public/home";
import { TeacherMainPage } from "../../../pages/teacher/main";

import { LoginPage } from "../../../pages/auth/login";
import { RegistrationPage } from "../../../pages/auth/registration";
import { ChoiceRolePage } from "../../../pages/auth/choice-role";

export const router = createBrowserRouter([
  { path: "/", element: <PublicHomePage /> },
  { path: "/teacher", element: <TeacherMainPage /> },

  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/registration/choose-role", element: <ChoiceRolePage /> },
]);
