import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 5000,
        style: {
          minHeight: "64px",
          padding: "16px 20px",
          borderRadius: "12px",
        },
      }}
    />
  </StrictMode>,
);
