// logout.js - Place this in your common js folder or include directly
function logout() {
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('tokenCreated');
    localStorage.removeItem('redirectAfterLogin'); // Clear any pending redirects

    // Redirect to login page
    window.location.href = '../signin.html';
}

// Usage
document.getElementById('logout').addEventListener('click', logout);