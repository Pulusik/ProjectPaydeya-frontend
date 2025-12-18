// src/utils/translations.js
export const translateError = (error) => {
  if (!error || typeof error !== 'string') {
    return "Неизвестная ошибка";
  }

  const translations = {
    // Из auth_service.go
    "invalid email or password": "Неверный email или пароль",
    "user with this email already exists": "Пользователь с таким email уже существует",
    "account is blocked": "Аккаунт заблокирован",
    "error hashing password": "Ошибка при создании пароля",
    "error creating user": "Ошибка при создании пользователя",
    "error finding user": "Ошибка при поиске пользователя",
    "invalid refresh token": "Недействительный токен обновления",
    "user not found": "Пользователь не найден",

    // Общие
    "email already exists": "Email уже зарегистрирован",
    "invalid email": "Некорректный email",
    "password too short": "Пароль слишком короткий",
    "invalid role": "Некорректная роль",
    "user already exists": "Пользователь уже существует",

    // Сетевые ошибки
    "network error": "Ошибка сети",
    "failed to fetch": "Ошибка соединения с сервером",

    // HTTP ошибки
    "bad request": "Неверный запрос",
    "internal server error": "Внутренняя ошибка сервера",
    "unauthorized": "Не авторизован",
    "not found": "Не найдено"
  };

  const lowerError = error.toLowerCase().trim();

  // Прямой перевод
  if (translations[lowerError]) {
    return translations[lowerError];
  }

  // Частичный перевод
  for (const [key, value] of Object.entries(translations)) {
    if (lowerError.includes(key.toLowerCase())) {
      return value;
    }
  }

  // Особый случай для блокировки с причиной
  if (lowerError.startsWith("account is blocked")) {
    const reasonMatch = error.match(/Reason:\s*(.+)/i);
    const reason = reasonMatch ? reasonMatch[1] : "не указана";
    return `Аккаунт заблокирован. Причина: ${reason}`;
  }

  // Если ошибка уже на русском
  if (/[а-яА-ЯёЁ]/.test(error)) {
    return error;
  }

  // Возвращаем оригинал если перевод не найден
  return error;
};

export const validationMessages = {
  emailRequired: "Введите email",
  emailInvalid: "Введите корректный email",
  passwordRequired: "Введите пароль",
  passwordTooShort: "Пароль должен быть не менее 6 символов",
  passwordsNotMatch: "Пароли не совпадают",
  nameRequired: "Введите имя",
  lastNameRequired: "Введите фамилию",
  agreeToTermsRequired: "Необходимо согласие на обработку персональных данных"
};