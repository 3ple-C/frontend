function checkAuthStatus() {
    // Skip check on auth pages
    if (window.location.pathname.includes('/signin.html') ||
        window.location.pathname.includes('/signup.html') ||
        window.location.pathname.includes('/otp-verification.html')) {
        return;
    }

    const authToken = sessionStorage.getItem('authToken');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    // If no auth token or user data, redirect to login
    if (!authToken || !userData) {
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '/signin.html';
        return;
    }

    // Optional: Check token expiration if you have it
    const tokenCreated = sessionStorage.getItem('tokenCreated');
    if (tokenCreated) {
        const tokenAge = Date.now() - parseInt(tokenCreated);
        const tokenMaxAge = 24 * 60 * 60 * 1000; // 24 hours
        if (tokenAge > tokenMaxAge) {
            sessionStorage.removeItem('authToken');
            sessionStorage.removeItem('userData');
            sessionStorage.removeItem('tokenCreated');
            sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
            window.location.href = '/signin.html';
            return;
        }
    }
}