import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import path from "path";

export const mainConfig: Configuration = {
  target: "electron-main",
  entry: "./src/index.ts",
  module: {
    rules: rules,
  },
  externals: [
    function (data, callback) {
      const { request } = data;

      if (request && request.endsWith(".node")) {
        return callback(null, `commonjs ${request}`);
      }

      if (require("module").builtinModules.includes(request)) {
        return callback(null, `commonjs ${request}`);
      }

      callback();
    },
  ],
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json", ".node"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
