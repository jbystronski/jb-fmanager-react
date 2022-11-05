import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import css from "rollup-plugin-import-css";
import externals from "rollup-plugin-node-externals";
import alias from "@rollup/plugin-alias";
import { terser } from "rollup-plugin-terser";

const path = require("path");
const pkgJson = require("./package.json");

const devMode = process.env.NODE_ENV === "development";
console.log(`${devMode ? "development" : "production"} mode bundle`);

export default {
  external: ["react", "react-dom", "styled-components"],
  watch: {
    include: "./src/**",
    clearScreen: false,
  },
  input: "src/index.js",
  output: [
    {
      file: pkgJson.module,
      format: "esm",
      sourcemap: devMode,
    },
    {
      file: pkgJson.main,
      format: "cjs",
      sourcemap: devMode,
    },
  ],
  plugins: [
    externals(),
    commonjs({
      ignoreGlobal: true,
      include: /\/node_modules\//,
    }),
    alias({
      entries: ["ui", "providers", "utils", "helpers"].map((entry) => {
        return {
          find: `@${entry}`,
          replacement: path.resolve(__dirname, `src/js/${entry}`),
        };
      }),
    }),
    css(),
    resolve(),
    babel({
      babelHelpers: "runtime",
      exclude: /^(.+\/)?node_modules\/.+$/,
      presets: ["@babel/preset-env", "@babel/preset-react"],
      extensions: [".js", ".jsx"],
    }),
    terser(),
  ],
};
