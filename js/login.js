// Updated login code with enhanced security and redirection

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
    return emailRegex.test(email.trim());
}

function validatePassword(password, minLength = 6) {
    return password.length >= minLength;
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    if (!loginForm) {
        console.error('Login form not found!');
        return;
    }

    const emailInput = loginForm.querySelector('.login-email');
    const passwordInput = loginForm.querySelector('.login-password');
    const loginBtn = loginForm.querySelector('.login-btn');
    const errorDisplay = document.getElementById('loginError');

    // API From config.js
    const API_URL = window.APP_CONFIG.API_URL;

    // Error Handling
    function showError(message) {
        errorDisplay.textContent = message;
        errorDisplay.style.display = 'flex';
        errorDisplay.style.color = '#FFAB00';
        errorDisplay.style.background = 'rgba(255, 214, 79, 0.57)';
        errorDisplay.style.border = '1px solid #FFEE58;';
    }

    function clearError() {
        errorDisplay.style.display = 'none';
    }

    function validateLoginForm() {
        clearError();

        if (!emailInput.value || !passwordInput.value) {
            loginBtn.disabled = true;
            return false;
        }

        const isEmailValid = validateEmail(emailInput.value);
        const isPasswordValid = validatePassword(passwordInput.value);

        if (!isEmailValid) showError('Please enter a valid email');
        else if (!isPasswordValid) showError('Password must be at least 6 characters');

        loginBtn.disabled = !(isEmailValid && isPasswordValid);
        return !loginBtn.disabled;
    }

    // Check if user is already logged in
    function checkExistingSession() {
        const authToken = sessionStorage.getItem('authToken');

        if (authToken) {
            // If user is already logged in, check if there's a pending redirect
            const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
            if (redirectUrl) {
                // Clear it after use
                sessionStorage.removeItem('redirectAfterLogin');
                window.location.href = redirectUrl;
            } else {
                // Default to dashboard if no specific redirect
                window.location.href = '/user_dashboard/dashboard.html';
            }
            return true;
        }

        return false;
    }

    async function handleLogin(e) {
        e.preventDefault();

        if (!validateLoginForm()) return;

        // Show loading indication
        loginBtn.disabled = true;
        loginBtn.textContent = 'Signing in...';

        try {
            // Connect to your API endpoint
            const apiUrl = `${ API_URL }/login`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle specific error status codes according to your API
                if (response.status === 401) {
                    throw new Error('Invalid email or password. Please try again.');
                } else if (response.status === 403) {
                    throw new Error('Email not verified. Please check your inbox to verify your account.');
                } else {
                    throw new Error(data.message || 'Login failed. Please try again later.');
                }
            }

            // Handle successful login
            console.log('Login successful:', data);

            // Store auth token from your API response with expiration
            if (data.token) {
                // Store the token
                sessionStorage.setItem('authToken', data.token);

                // Store token creation time for expiration checking
                sessionStorage.setItem('tokenCreated', new Date().getTime());

                // Store user information if needed
                if (data.user) {
                    sessionStorage.setItem('userData', JSON.stringify(data.user));
                }

                // Handle redirection
                if (sessionStorage.getItem('redirectAfterLogin')) {
                    // Redirect to the page the user was trying to access
                    const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
                    sessionStorage.removeItem('redirectAfterLogin'); // Clear it after use
                    window.location.href = redirectUrl;
                } else {
                    // Default redirect
                    window.location.href = '/user_dashboard/dashboard.html';
                }
            } else {
                throw new Error('Authentication failed. No token received.');
            }
        } catch (error) {
            showError(error.message || 'Login failed. Please try again later.');
            console.error('Login error:', error);
        } finally {
            // Reset button state
            loginBtn.disabled = false;
            loginBtn.textContent = 'Sign in';
        }
    }

    // Event Listeners
    emailInput.addEventListener('input', validateLoginForm);
    passwordInput.addEventListener('input', validateLoginForm);
    loginForm.addEventListener('submit', handleLogin);

    // Add click event listener to the login button
    loginBtn.addEventListener('click', handleLogin);

    // Check for existing session before initializing the form
    if (!checkExistingSession()) {
        // Only initialize the form if no active session
        validateLoginForm();
    }
});