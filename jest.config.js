module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>setupTests.js"],
  moduleNameMapper: {
    "@ui(.*)": "<rootDir>/src/js/ui$1",
    "@helpers(.*)": "<rootDir>/src/js/helpers$1",
    "@utils(.*)": "<rootDir>/src/js/utils$1",
    "@providers(.*)": "<rootDir>/src/js/providers$1",
    "@components(.*)": "<rootDir>/src/js/components",
  },
};
