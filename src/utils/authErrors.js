const MESSAGES = {
    invalid_credentials: 'Wrong email or password',
    user_already_exists: 'An account with this email already exists',
    email_exists: 'An account with this email already exists',
    weak_password: 'The password is too weak',
    email_not_confirmed: 'The email is not confirmed yet',
    over_request_rate_limit: 'Too many attempts. Please try again in a moment',
};

export function translateAuthError(error) {
    if (error?.code && MESSAGES[error.code]) {
        return MESSAGES[error.code];
    }

    const isNetworkError =
        error?.name === 'AuthRetryableFetchError' ||
        error?.message?.includes('Network request failed');

    if (isNetworkError) {
        return 'Cannot reach the server. Check your internet connection.';
    }

    return error?.message || 'Something went wrong. Please try again.';
}
