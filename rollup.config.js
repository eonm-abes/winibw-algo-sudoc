import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default {
  output: {
    strict: false,
  },
  plugins: [
    resolve(),
    commonjs({
      sourceMap: false,
    }),
    babel({
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/env",
          {
            targets: {
              browsers: "> 1%, IE 6",
              node: 8,
            },
            useBuiltIns: "usage",
          },
        ],
      ],
    }),
  ],
};
