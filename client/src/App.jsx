import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import QrDataComponent from "./QrDataComp";
import QrGenerator from "./QrGenerator";
import QrVerifyComponent from "./QrVerify";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LoginForm from "./pages/Login";
import SignUpForm from "./pages/Signup";
import { useAuth } from "./context/AuthContext";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  // const [view, setView] = useState('generator');

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<QrGenerator />} /> */}
          {/* <Route path="/verify" element={<QrVerifyComponent />} /> */}
          {/* <Route path="/qr/:qrId" element={<QrDataComponent />} /> */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />


          <Route
            path="/"
            element={
              <PrivateRoute>
                <QrGenerator />
              </PrivateRoute>
            }
          />
          <Route
            path="/qr/:qrId"
            element={
              <PrivateRoute>
                <QrDataComponent />
              </PrivateRoute>
            }
          />

          {/* If the user is not authenticated, they will be redirected to the login page */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
