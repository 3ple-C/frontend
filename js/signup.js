// DOM Elements
const formInputs = document.querySelectorAll('.input');
const formButton = document.querySelector('.form__btn');
const errorMessage = document.getElementById('signupError');
const planSelect = document.getElementById('plans');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Debugging: Log initial state
console.log('Signup script loaded');
console.log('Form inputs found:', formInputs.length);
console.log('Submit button:', formButton ? 'Found' : 'Not found');
console.log('Error message element:', errorMessage ? 'Found' : 'Not found');

// Destructure inputs with fallback
const username = formInputs[0] || {};
const email = formInputs[1] || {};
const password = formInputs[2] || {};
const confirmPassword = formInputs[3] || {};

// API Configuration
const API_URL = window.APP_CONFIG.API_URL;
console.log('API URL configured:', API_URL);

// Form Validation and Signup
function validateForm() {
    console.log('Validating form inputs...');

    const formData = {
        username: username.value?.trim() || '',
        email: email.value?.trim() || '',
        plan: planSelect.value || '',
        password: password.value || '',
        confirm_password: confirmPassword.value || '',
        isValid: true,
        errors: {},
    };

    console.log('Form data collected:', {
        username: formData.username,
        email: formData.email,
        plan: planSelect.value,
        password: formData.password ? '******' : 'empty',
        confirm_password: formData.confirm_password ? '******' : 'empty'
    });

    // Validations
    if (formData.username.length < 3) {
        formData.isValid = false;
        formData.errors.username = 'Username must be at least 3 characters';
        console.log('Validation failed: Username too short');
    }
    if (!emailRegex.test(formData.email)) {
        formData.isValid = false;
        formData.errors.email = 'Please enter a valid email';
        console.log('Validation failed: Invalid email format');
    }
    if (formData.password.length < 6) {
        formData.isValid = false;
        formData.errors.password = 'Password must be at least 6 characters';
        console.log('Validation failed: Password too short');
    }
    if (formData.password !== formData.confirm_password) {
        formData.isValid = false;
        formData.errors.confirmPassword = 'Passwords do not match';
        console.log('Validation failed: Password mismatch');
    }
    if (!formData.plan || formData.plan === "1") {
        formData.isValid = false;
        formData.errors.plan = 'Please select a valid plan';
        console.log('Validation failed: No plan selected');
    }

    console.log('Validation result:', formData.isValid ? 'Valid' : 'Invalid', formData.errors);
    return formData;
}

function displayError(message, isWarning = false) {
    console.error('Displaying error to user:', message);

    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'flex';

        if (isWarning) {
            // Yellow styling for warnings (validation, email not verified)
            errorMessage.style.color = '#FFAB00';
            errorMessage.style.backgroundColor = 'rgba(255, 213, 79, 0.1)';
            errorMessage.style.border = '1px solid #FFEE58';
        } else {
            // Red styling for critical errors
            errorMessage.style.color = '#ff4d4f';
            errorMessage.style.backgroundColor = 'rgba(255, 77, 79, 0.1)';
            errorMessage.style.border = '1px solid #ff4d4f';
        }
    }
}

function clearError() {
    console.log('Clearing error messages');
    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
}

async function submitForm() {
    console.log('Form submission initiated');
    clearError();
    const { isValid, errors, ...apiData } = validateForm();

    if (!isValid) {
        console.error('Form validation failed with errors:', errors);
        const firstError = Object.values(errors)[0];
        displayError(firstError, true); // Warning style for client-side errors
        return;
    }

    try {
        formButton.disabled = true;
        formButton.textContent = 'Signing up...';

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: apiData.username,
                email: apiData.email,
                plan: apiData.plan,
                password: apiData.password,
                password_confirmation: apiData.confirm_password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            let errorMsg = 'Registration failed. Please try again.';
            let isWarning = false;

            // Handle specific error codes based on your API
            switch (response.status) {
                case 400:
                    errorMsg = 'Invalid or expired token. Please request a new one.';
                    break;
                case 401:
                    errorMsg = 'Invalid credentials. Please check your email and password.';
                    break;
                case 403:
                    errorMsg = 'Please verify your email before signing in.';
                    isWarning = true;
                    break;
                case 404:
                    errorMsg = 'Account not found. Please register first.';
                    break;
                case 422:
                    if (data.errors) {
                        // Get the first error message from validation errors
                        const firstError = Object.values(data.errors)[0];
                        errorMsg = Array.isArray(firstError) ? firstError[0] : firstError;
                        isWarning = true;
                    }
                    break;
                case 500:
                    errorMsg = 'Server error. Please try again later or contact support.';
                    break;
                default:
                    errorMsg = data.message || 'Registration failed. Please try again.';
            }

            displayError(errorMsg, isWarning);
            throw new Error(`API Error ${response.status}: ${errorMsg}`);
        }

        // On successful registration
        sessionStorage.setItem('otpEmail', apiData.email);
        sessionStorage.setItem('user_id', data.user_id);
        sessionStorage.setItem('user_name', data.name);
        // sessionStorage.setItem('authToken', data.token);
        sessionStorage.setItem('user_plan', apiData.plan);

        setTimeout(() => {
            window.location.href = '/otp-verification.html';
        }, 1000);

    } catch (error) {
        console.error('Signup process failed:', error);
        // Error message already displayed in the switch case
    } finally {
        formButton.disabled = false;
        formButton.textContent = 'Sign Up';
    }
}

// Event listeners
if (formButton) {
    console.log('Adding click event listener to submit button');
    formButton.addEventListener('click', (e) => {
        e.preventDefault();
        submitForm();
    });
}

if (formInputs.length > 0) {
    console.log('Adding input event listeners to form fields');
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (formButton) {
                clearError();
                const isValid = validateForm().isValid;
                console.log('Input changed. Form valid:', isValid);
                formButton.disabled = !isValid;
            }
        });
    });
}

if (planSelect) {
    planSelect.addEventListener('change', () => {
        clearError();
        const isValid = validateForm().isValid;
        if (formButton) formButton.disabled = !isValid;
    });
}

// Initial setup
if (formButton) {
    console.log('Initializing submit button as disabled');
    formButton.disabled = true;
}

console.log('Registration form initialized');