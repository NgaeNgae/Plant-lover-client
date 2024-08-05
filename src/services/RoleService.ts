const ROLE_NAME = "role_name"
export const setRole = (role : string) => {
    return localStorage.setItem(ROLE_NAME,role);
}
export const getRole = () => {
    return localStorage.getItem(ROLE_NAME);
}
export const removeRole = () => {
    return localStorage.removeItem(ROLE_NAME);
}