module.exports = {
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "src/Bootstrap.ts",
        "src/index.ts",
        "src/http/HttpServer.ts",
        "src/http/controller/ControllerHandler.ts",
        "src/repository/MovieRepository/MovieRepository.ts",
        "src/service/dao/MovieDao.ts",
        "src/http/ControllerHandler.ts"
    ],
    "coveragePathIgnorePatterns" : [
        "src/Bootstrap.ts",
        "src/index.ts",
        "src/http/HttpServer.ts",
        "src/http/controller/ControllerHandler.ts",
        "src/repository/MovieRepository/MovieRepository.ts",
        "src/service/dao/MovieDao.ts",
        "src/http/ControllerHandler.ts"
    ],
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.json",
            "diagnostics": false
        }
    },
    "testMatch": [
        "**/__tests__/**/*.+(ts|tsx|js)"
    ],
    "collectCoverage": true,
    "collectCoverageFrom" : ['src/**/*.{ts}'],
};

