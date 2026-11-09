// Всяка функция връща текст на грешката или null, ако полето е наред.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export function validateEmail(email) {
  const value = email.trim();

  if (!value) return 'Имейлът е задължителен';
  if (!EMAIL_REGEX.test(value)) return 'Невалиден имейл адрес';
  return null;
}

// При регистрация - няколко правила наведнъж (това е "complex rule" от изпита)
export function validatePassword(password) {
  if (!password) return 'Паролата е задължителна';
  if (password.length < 6) return 'Паролата трябва да е поне 6 символа';
  if (!/\d/.test(password)) return 'Паролата трябва да съдържа поне една цифра';
  return null;
}

export function validateRepeatPassword(password, repeatPassword) {
  if (!repeatPassword) return 'Повтори паролата';
  if (password !== repeatPassword) return 'Паролите не съвпадат';
  return null;
}

export function validateUsername(username) {
  const value = username.trim();

  if (!value) return 'Потребителското име е задължително';
  if (value.length < 3) return 'Поне 3 символа';
  if (value.length > 20) return 'Най-много 20 символа';
  if (!USERNAME_REGEX.test(value)) return 'Само латински букви, цифри и _';
  return null;
}

// Помощна - true, ако в обекта с грешки има поне една
export function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}
