// authUtils.js
export function isTokenExpired(token) {
    if (!token) {
        return true;
    }

    const tokenData = JSON.parse(atob(token.split('.')[1]));

    if (!tokenData.exp) {
        return true;
    }

    const expirationTimestamp = tokenData.exp * 1000;
    const currentTimestamp = Date.now();

    return currentTimestamp > expirationTimestamp;
}
