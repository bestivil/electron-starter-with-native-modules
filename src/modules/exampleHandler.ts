import { ipcMain } from "electron";
import path from "path";

let addon: any = null;
const addonLoaded = false;

function dynamicRequire(modulePath: string) {
  const req = eval("require") as NodeRequire;
  return req(modulePath);
}

function loadExampleAddon() {
  if (addonLoaded) return addon;

  const loadingStrategies = [
    () => {
      const cwdPath = path.join(
        process.cwd(),
        "build",
        "Release",
        "simulator.node"
      );
      console.log(`Trying cwd path: ${cwdPath}`);
      return dynamicRequire(cwdPath);
    },

    // OTHER METHODS TO LOAD NATIVE MODULES

    // () => {
    //   const nodeLoaderPath = "../../build/Release/simulator.node";
    //   return dynamicRequire(nodeLoaderPath);
    // },

    // // 2. Relative to __dirname
    // () => {
    //   const relativePath = path.join(
    //     __dirname,
    //     "..",
    //     "..",
    //     "build",
    //     "Release",
    //     "simulator.node"
    //   );
    //   console.log(`Trying relative path: ${relativePath}`);
    //   return dynamicRequire(relativePath);
    // },

    // () => {
    //   const prodPath = path.join(
    //     process.resourcesPath,
    //     "build",
    //     "Release",
    //     "simulator.node"
    //   );
    //   console.log(`Trying production path: ${prodPath}`);
    //   return dynamicRequire(prodPath);
    // },

    // () => {
    //   console.log("Trying direct require");
    //   return dynamicRequire("simulator");
    // },
  ];

  for (const strategy of loadingStrategies) {
    try {
      addon = strategy();
      console.log("Successfully loaded addon");

      return addon;
    } catch (error) {
      console.log(`Loading failed: ${error.message}`);
    }
  }

  if (!addon) {
    console.warn("Native addon not loaded");
  }

  return addon;
}
export class ExampleHandler {
  static setupIPC(): void {
    loadExampleAddon();

    ipcMain.handle("example", () => {
      try {
        if (!addon) {
          throw new Error("Native addon not loaded");
        }

        const result = addon.sampleFunction();

        return { success: true, result };
      } catch (error) {
        return { success: false, error: error.message };
      }
    });
  }

  static async sampleFunction(): Promise<string> {
    const { ipcRenderer } = window.require("electron");
    const result = await ipcRenderer.invoke("example");

    if (result.success) {
      return result.result;
    } else {
      throw new Error(result.error);
    }
  }
}
