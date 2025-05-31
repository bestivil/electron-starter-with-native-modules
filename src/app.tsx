import React, {
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import * as ReactDOM from "react-dom/client";

import { ThemeProvider } from "@/components/themes/theme-provider";
import { ExampleHandler } from "./modules/exampleHandler";

import { HashRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    ExampleHandler.sampleFunction().then((value) => setData(value));
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex h-screen bg-background text-foreground flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Electron with Native Modules</h1>
        <p>{data}</p>
      </div>
    </ThemeProvider>
  );
};

function render() {
  const root = ReactDOM.createRoot(document.getElementById("app"));
  root.render(
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </HashRouter>
  );
}

render();
