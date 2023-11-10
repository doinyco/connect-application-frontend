export const isTokenValid = () => {
    const tokenExpirationTime = parseInt(localStorage.getItem('tokenExpirationTime'));
    
    // Check if the current time is before the expiration time
    return tokenExpirationTime && tokenExpirationTime > Date.now();
};