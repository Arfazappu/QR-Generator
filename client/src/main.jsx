import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3} autoHideDuration={3000} preventDuplicate anchorOrigin={{ vertical:'top', horizontal:'right'}}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </SnackbarProvider>
);
