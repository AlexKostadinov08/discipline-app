import { toDateString } from './dates';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export function validateEmail(email) {
    const value = email.trim();

    if (!value) return 'Email is required';
    if (!EMAIL_REGEX.test(value)) return 'Invalid email address';
    return null;
}

export function validatePassword(password) {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/\d/.test(password)) return 'Password must contain at least one digit';
    return null;
}

export function validateRepeatPassword(password, repeatPassword) {
    if (!repeatPassword) return 'Repeat the password';
    if (password !== repeatPassword) return 'Passwords do not match';
    return null;
}

export function validateUsername(username) {
    const value = username.trim();

    if (!value) return 'Username is required';
    if (value.length < 3) return 'At least 3 characters';
    if (value.length > 20) return 'At most 20 characters';
    if (!USERNAME_REGEX.test(value)) return 'Only Latin letters, digits and _';
    return null;
}

export function hasErrors(errors) {
    return Object.values(errors).some(Boolean);
}

export function validateTitle(title) {
    const value = title.trim();

    if (!value) return 'Title is required';
    if (value.length < 3) return 'At least 3 characters';
    if (value.length > 40) return 'At most 40 characters';
    return null;
}

export function validateCategory(category) {
    if (!category) return 'Pick a category';
    return null;
}

export function validateDescription(description) {
    if (description.length > 200) return 'At most 200 characters';
    return null;
}

export function validateDeadline(deadline, isDaily) {
    if (isDaily) return null;
    if (!deadline) return null;

    const today = toDateString(new Date());

    if (deadline < today) return 'The deadline cannot be in the past';
    return null;
}
