module.exports = {
  testEnvironment: 'jsdom',
  rootDir: '.',
  testMatch: ['**/+(*.)+(test).+(ts|js)?(x)'],
  setupFilesAfterEnv: ['./src/setup-tests.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy'
  }
}
