const { ipcRenderer } = window.require("electron");

export class ExampleIPC {
  static async sampleFunction(): Promise<{
    result?: number;
    error?: string;
  }> {
    return await ipcRenderer.invoke("example");
  }
}
