module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'babel-jest', // Use ts-jest for .ts and .tsx files
    },
    moduleFileExtensions: ['ts', 'js'], // Add TypeScript file extensions
};
