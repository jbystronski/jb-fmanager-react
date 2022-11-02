import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import css from "rollup-plugin-import-css";
import externals from "rollup-plugin-node-externals";
import alias from "@rollup/plugin-alias";
const path = require("path");

const packageJson = require("./package.json");

const aliasResolve = (target) => path.resolve(__dirname, target);

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

export default {
  input: "./src/index.js",
  external: ["react", "react-dom", "styled-components"],
  watch: {
    include: "./src/**",
    clearScreen: false,
  },
  output: {
    file: packageJson.main,
    format: "esm",
    sourcemap: devMode ? "inline" : false,
  },
  plugins: [
    alias({
      entries: [
        {
          find: "@ui",
          replacement: aliasResolve("src/js/ui"),
        },
        {
          find: "@providers",
          replacement: aliasResolve("src/js/providers"),
        },
        {
          find: "@utils",
          replacement: aliasResolve("src/js/utils"),
        },
        {
          find: "@helpers",
          replacement: aliasResolve("src/js/helpers"),
        },
      ],
    }),
    externals(),

    css(),

    resolve(),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require("react")),
        "react-is": Object.keys(require("react-is")),
      },
    }),
    babel({
      babelHelpers: "runtime",
      exclude: /^(.+\/)?node_modules\/.+$/,
      presets: ["@babel/preset-env", "@babel/preset-react"],
      extensions: [".js", ".jsx"],
    }),
  ],
};
