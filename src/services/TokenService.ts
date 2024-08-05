const AUTH_TOKEN = "token"
export const setAuthToken = (token : string) => {
    return localStorage.setItem(AUTH_TOKEN,token);
}
export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
}
export const removeAuthToken = () => {
    return localStorage.removeItem(AUTH_TOKEN);
}