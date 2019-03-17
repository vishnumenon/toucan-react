import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";

const config = {
  input: "src/toucan-react.js",
  external: ["react"],
  output: {
    format: "umd",
    name: "toucan-react",
    globals: {
      react: "React"
    }
  },
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    terser()
  ]
};
export default config;
