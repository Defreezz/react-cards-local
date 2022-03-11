import { Dispatch } from "redux";
import { usersAPI } from "../../main/api/api";

type InitStateType = typeof initState;
type AllActionsType = ReturnType<typeof getLoginAC>

const initState = {
    email: '',
    name: '',
    isLogin : false
};

export const loginReducer = (state = initState, action: AllActionsType): InitStateType => {
    switch (action.type) {
        case "GET_LOGIN":
            return {
                ...state,
                email: action.email,
                name: action.name,
                isLogin: true,
            }
        default:
            return state;
    }
};

export const getLoginAC = (email: string, name: string) => {
    return {
        type: "GET_LOGIN",
        email,
        name,
    } as const
}

export const getLoginUserData = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch) => {

        usersAPI.logIn(email, password, rememberMe)
            .then(data => {
                dispatch(getLoginAC(data.email, data.name))
            })
            .catch(err => {
                const error = err.response ? err.response.data.error : (err.message + ', more details in the console');
                console.log('Error: ', error)
            })


}

