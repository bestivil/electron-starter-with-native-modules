import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";
import path from "path";

export const rendererConfig: Configuration = {
  target: "electron-renderer",
  externalsPresets: { electron: true },
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    fallback: {
      path: false,
      fs: false,
      os: false,
      module: false,
    },
  },
};
