import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegistrationPage/RegisterPage";
import Dashboard from "./pages/Dashboard";
import type { User } from "./types";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user===null ?<LoginPage setUser={setUser} />: <Navigate to="/dashboard" />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/dashboard"
          element={user!==null ? <Dashboard user={user} setUser={setUser} />: <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
