// Supabase връща грешките на английски - тук ги превеждаме за потребителя.

const MESSAGES = {
  invalid_credentials: 'Грешен имейл или парола',
  user_already_exists: 'Вече има акаунт с този имейл',
  email_exists: 'Вече има акаунт с този имейл',
  weak_password: 'Паролата е твърде слаба',
  email_not_confirmed: 'Имейлът още не е потвърден',
  over_request_rate_limit: 'Твърде много опити. Опитай пак след малко',
};

export function translateAuthError(error) {
  if (error?.code && MESSAGES[error.code]) {
    return MESSAGES[error.code];
  }

  const isNetworkError =
    error?.name === 'AuthRetryableFetchError' ||
    error?.message?.includes('Network request failed');

  if (isNetworkError) {
    return 'Няма връзка със сървъра. Провери интернета.';
  }

  return error?.message || 'Нещо се обърка. Опитай отново.';
}
