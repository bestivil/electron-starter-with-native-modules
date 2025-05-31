import type { ModuleOptions } from "webpack";

export const rules: Required<ModuleOptions>["rules"] = [
  {
    test: /\.node$/,
    use: [
      {
        loader: "node-loader",
        options: {
          name: "[name].[ext]",
        },
      },
    ],
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.css$/,
    use: [
      { loader: "style-loader" },
      { loader: "css-loader", options: { importLoaders: 1 } },
      { loader: "postcss-loader" },
    ],
  },
];
