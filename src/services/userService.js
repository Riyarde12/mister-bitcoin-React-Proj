import { storageService } from './storageService.js';

const STORAGE_KEY = 'loggedinUser';
const USERS_KEY = 'users';
// let gUsers = [];

export const userService = {
    getLoggedInUser,
    updateUser,
    getUser,
    login,
    signUp,
};

function getUser() {
    return {
        name: 'Yarden Rishoni',
        coins: 100,
        moves: []
    };
}

function login(userlogin) {
    const { username, password } = userlogin;
    if (username && password) {
        return new Promise((resolve, reject) => {
            const users = storageService.load(USERS_KEY);
            console.log('users', users);
            let user = users.filter(user => (user.username === username && user.password === password));
            console.log('user', user);
            if (user.length) {
                storageService.store(STORAGE_KEY, ...user);
                resolve('resolved');
            } else reject('Invalid user');
        });
    } else return 'Missing fields';
}

function signUp(user) {
    const { fullname, password, username } = user;
    return new Promise((resolve, reject) => {
        if (fullname && password && username) {
            var newUser = {
                fullname,
                password,
                username,
                coins: 100,
                moves: [],
            };
            let users = storageService.load(USERS_KEY);
            users.push(newUser);
            storageService.store(USERS_KEY, users);
            resolve(newUser);
        } else return reject('One or more fields are missing');
    });
}

function getLoggedInUser() {
    console.log('get loggin', storageService.load(STORAGE_KEY));
    return storageService.load(STORAGE_KEY);
}

function updateUser(user) {
    storageService.store(STORAGE_KEY, user);
}
