import { toDateString } from './dates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export function validateEmail(email) {
    const value = email.trim();

    if (!value) return 'Имейлът е задължителен';
    if (!EMAIL_REGEX.test(value)) return 'Невалиден имейл адрес';
    return null;
}

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

export function hasErrors(errors) {
    return Object.values(errors).some(Boolean);
}

export function validateTitle(title) {
    const value = title.trim();

    if (!value) return 'Заглавието е задължително';
    if (value.length < 3) return 'Поне 3 символа';
    if (value.length > 40) return 'Най-много 40 символа';
    return null;
}

export function validateCategory(category) {
    if (!category) return 'Избери категория';
    return null;
}

export function validateDescription(description) {
    if (description.length > 200) return 'Най-много 200 символа';
    return null;
}

export function validateDeadline(deadline, isDaily) {
    if (isDaily) return null;
    if (!deadline) return null;

    const today = toDateString(new Date());

    if (deadline < today) return 'Срокът не може да е в миналото';
    return null;
}
