module.exports = {
  testEnvironment: "jsdom",
  rootDir: ".",
  testMatch: ["**/+(*.)+(test).+(ts|js)?(x)"],
  setupFilesAfterEnv: ["./src/setup-tests.js"],
  moduleNameMapper: {
    "\\.scss$": "identity-obj-proxy",
  },
};
