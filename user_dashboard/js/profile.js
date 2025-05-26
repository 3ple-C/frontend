// Fixed profile.js - corrected the error with undefined variables
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check if we're on the login page to prevent loops
    if (window.location.pathname.includes('/signin.html')) {
        return;
    }

    // 2. Get user data
    const authToken = sessionStorage.getItem('authToken');
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    // 3. Simple auth check
    if (!authToken || !userData) {
        // Store current path for redirect after login
        sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        window.location.href = '../signin.html';
        return;
    }

    // 4. Display data if we have it
    renderProfile(userData);
});

function redirectToLogin() {
    // Don't redirect if already on login page
    if (window.location.pathname.includes('/signin.html')) {
        return;
    }
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    window.location.href = '../signin.html';
}

function renderProfile(user) {
    // Only try to update DOM elements if they exist
    if (!user) return;

    // Get elements by class name
    const userNameElements = document.getElementsByClassName('userName');
    const userEmailElements = document.getElementsByClassName('userEmail');
    // const userJoinDateElements = document.getElementsByClassName('user-join-date');
    // const userAvatarElements = document.getElementsByClassName('user-avatar');

    // Debug: Log found elements
    console.log('User name elements found:', userNameElements.length);
    console.log('User email elements found:', userEmailElements.length);

    // Process name elements
    if (userNameElements.length > 0) {
        const shortName = user.name?.split(' ')[0]?.substring(0, 9) || 'Guest';
        console.log('Setting user name to:', shortName);

        Array.from(userNameElements).forEach(el => {
            el.textContent = shortName;
            console.log('Set name on element:', el);
        });
    } else {
        console.warn('No user name elements found with class "user-name"');
    }

    // Process email elements
    if (userEmailElements.length > 0 && user.email) {
        console.log('Setting user email to:', user.email);

        Array.from(userEmailElements).forEach(el => {
            el.textContent = user.email;
            console.log('Set email on element:', el);
        });
    } else if (!user.email) {
        console.warn('No user email available to set');
    } else {
        console.warn('No user email elements found with class "user-email"');
    }

    // Only access these elements if they exist
    // if (userJoinDateEl && user.createdAt) {
    //     userJoinDateEl.textContent = new Date(user.createdAt).toLocaleDateString();
    // }

    // Only access these elements if they exist
    // if (userAvatarEl && user.avatar) {
    //     userAvatarEl.src = user.avatar;
    // }
}