import { storageService } from './storageService.js';

const STORAGE_KEY = 'loggedinUser';

export const userService = {
    getLoggedinUser,
    updateUser,
    getUser,
    login,
};

function getUser() {
    return {
        name: 'Yarden Rishoni',
        coins: 100,
        moves: []
    };
}


function login() {
    const user = {
        fullname: 'Yarden Rishoni',
        prefs: {
            color: 'black',
            bgColor: '#ffffff'
        },
        activities: [
            // {
            //     txt:
            //         'Added a Todo, at: 1523873242735'
            // }
        ]
    };
    storageService.store(STORAGE_KEY, user);
}


function getLoggedinUser() {
    return storageService.load(STORAGE_KEY);
}

function updateUser(user) {
    storageService.store(STORAGE_KEY, user);
}
