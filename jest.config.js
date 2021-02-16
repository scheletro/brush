module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    testRegex: 'test/(.+)\\.test\\.(ts?)$',
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    moduleFileExtensions: ['ts', 'js'],
};