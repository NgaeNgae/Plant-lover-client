import { FETCH_USER_DATA } from "../dispatchTypes";

interface userState {
    user: null,
    loading : boolean
}
const initialState: userState = {
    user: null,
    loading : true
}
const userReducer = (state = initialState, action : any):userState => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        loading : false,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
