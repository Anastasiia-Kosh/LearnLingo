import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App/App.tsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          minHeight: "64px",
          padding: "16px 20px",
          borderRadius: "12px",
        },
      }}
    />
  </StrictMode>,
);
