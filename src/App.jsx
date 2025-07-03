import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
