module.exports = {
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFiles: ['<rootDir>/jest.polyfills.js', '<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['**/__tests__/*.(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
};
