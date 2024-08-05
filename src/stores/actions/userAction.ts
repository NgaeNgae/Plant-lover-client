import axios from "axios"
import { Dispatch } from "redux"
import { removeRole } from "../../services/RoleService";
import { removeAuthToken } from "../../services/TokenService";
import { FETCH_USER_DATA } from "../dispatchTypes";

export const fetchUser = () => {
    return(dispatch : Dispatch) => {
        axios.get('auth/user').then((({data}) => {
            dispatch({type: FETCH_USER_DATA, payload: data.data})
        })).catch((error) => {
            if(!error.response.data.con) {
                removeRole();
                removeAuthToken();
                window.location.assign("/");
            }
        });
}}