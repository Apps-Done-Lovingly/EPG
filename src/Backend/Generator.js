const getRandomWord = require('random-words');

const LETTERS_LOWER = "abcdefghijklmnopqrstuvwxyz";
const LETTERS_UPPER = LETTERS_LOWER.toUpperCase();
const SYMBOLS = "!@#$%^&*_-=+";
const NUMBERS = "1234567890";

function makeMemoryPassword(length) {
    /*
    Pick a random number from 1 to 3 -> Pick a random symbol to use for the random number -> 
    -> Check if length remaining <= 3 -> Repeat until length is fulfilled.
    */
    let password = '';

    const EVERYTHING = [LETTERS_LOWER, LETTERS_UPPER, SYMBOLS, NUMBERS];

    while (length > password.length) {
        const type = EVERYTHING[Math.floor(Math.random() * EVERYTHING.length)]

        const character = type.charAt(Math.floor(Math.random() * type.length));

        const times = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < times; i++) password = password + character;
    }

    while (length < password.length) {
        password = password.slice(1);
    }

    return password;
}

function makeTag() {
    /*
    Pick two random words -> Combine them -> Pick a random symbol -> Assign four random digits
    */
    let password = '';

    for (let i = 0; i < 2; i++) {
        const word = getRandomWord();
        password = password + word.charAt(0).toUpperCase() + word.slice(1);
    }

    password = password + SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));

    for (let i = 0; i < 4; i++) {
        password = password + Math.floor(Math.random() * 10);
    }
    return password;
}

function makeRandomPassword(passwordLength) {
    /*
    * Generate a random password traditionally
    */

    const EVERYTHING = [LETTERS_LOWER, LETTERS_UPPER, SYMBOLS, NUMBERS];


    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const type = EVERYTHING[Math.floor(Math.random() * EVERYTHING.length)]

        const character = type.charAt(Math.floor(Math.random() * type.length));

        password = password + character;
    }

    return password;
}

exports.memory = makeMemoryPassword;
exports.tag = makeTag;
exports.random = makeRandomPassword;