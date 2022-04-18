
const INITIAL_STATE = {
    loggedInUser: null
};


export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return {
                ...state,
                loggedInUser: { ...action.loggedInUser }
            };
        case 'SPEND_COINS':
            const { loggedInUser } = state;
            return {
                ...state,
                loggedInUser: { ...loggedInUser, coins: loggedInUser.coins - action.amount }
            };
        default:
            return state;
    }
}