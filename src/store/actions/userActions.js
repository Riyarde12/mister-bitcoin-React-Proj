import { userService } from "../../services/userService";

export function loadLoggedInUser() {
    return async (dispatch, getState) => {
        try {
            const loggedInUser = userService.getLoggedInUser();
            console.log('loggedInUser', loggedInUser);
            dispatch({ type: 'SET_LOGGED_IN_USER', loggedInUser });
        } catch (err) {
            console.log('cannot SET logged in user', err);
            throw err;
        }
    };
}

export function spendCoins(amount) {
    // console.log('amount', amount);
    return async (dispatch) => {
        dispatch({ type: 'SPEND_COINS', amount });
    };
}

export function saveUser(user) {

}