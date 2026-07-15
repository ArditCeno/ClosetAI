const { getDefaultConfig } = require("expo/metro-config");
const { withCssInterop } = require("react-native-css-interop/metro");
const path = require("path");
const { build } = require("tailwindcss/lib/cli/build");
const fs = require("fs");

const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = true;

const cssInput = path.resolve(__dirname, "global.css");

function getCSSForPlatform(options) {
  return new Promise((resolve, reject) => {
    const fakeOutput = path.join(__dirname, ".cache", `nativewind-${options.platform}.css`);
    fs.mkdirSync(path.dirname(fakeOutput), { recursive: true });

    const originalReadFile = fs.promises.readFile;
    const originalMkdir = fs.promises.mkdir.bind(fs.promises.mkdir);
    const originalWriteFile = fs.promises.writeFile.bind(fs.promises.writeFile);

    let cssContent = "";

    fs.promises.readFile = async (p, encoding) => {
      if (p === fakeOutput) return cssContent;
      return originalReadFile(p, encoding);
    };
    fs.promises.mkdir = async (p, ...args) => {
      if (p === fakeOutput) return;
      return originalMkdir(p, ...args);
    };
    fs.promises.writeFile = async (p, data, ...args) => {
      if (p !== fakeOutput) {
        throw new Error(`Tailwind CLI attempted to write file ${p}`);
      }
      cssContent = data.toString();
      return;
    };

    build({
      "--input": cssInput,
      "--output": fakeOutput,
    })
      .then(() => {
        fs.promises.readFile = originalReadFile;
        fs.promises.mkdir = originalMkdir;
        fs.promises.writeFile = originalWriteFile;
        resolve(cssContent);
      })
      .catch(reject);
  });
}

module.exports = withCssInterop(config, {
  getCSSForPlatform,
  input: cssInput,
  parent: { name: "nativewind" },
});
