import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { StoreContextProvider } from "./Context/StoreContext.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
      <StoreContextProvider>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
      </StoreContextProvider>
);
