const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// This ensures Metro picks up the CommonJS version of libraries like Zustand, 
// avoiding the "Uncaught SyntaxError: Cannot use 'import.meta' outside a module" error on web builds.
config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: "./global.css" });
