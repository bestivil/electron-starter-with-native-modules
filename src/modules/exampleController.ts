import path from "path";

const getAddonPath = () => {
  if (process.env.NODE_ENV === "development") {
    return path.join(__dirname, "../../build/Release/simulator.node");
  } else {
    return path.join(process.resourcesPath, "build/Release/simulator.node");
  }
};

let addon: any;
try {
  addon = require(getAddonPath());
} catch (error) {
  console.error("Failed to load native addon:", error);
  addon = require("../../build/Release/simulator.node");
}

class ExampleController {
  sampleFunction() {
    const result = addon.sampleFunction();
    if (result === -1) {
      throw new Error("Example not found! Make sure it's running.");
    }
    return result;
  }
}

export default ExampleController;
