
import React from "react";
import Homepage from './pages/Homepage';
import Admintool from './pages/Admintool';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import { useResume } from './context/ResumeProvider';
import Login from "./pages/Login";

function App() {
  const { isLoggedIn } = useResume();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <Admintool />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
