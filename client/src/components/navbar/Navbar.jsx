import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/cryptoLogo2.png";
import { useAuth } from "../../context/AuthContext";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const { authToken, logout } = useAuth();

  const handleLogin = () => {
    // setIsLoggedIn(true)
    navigate("/login");
  };
  const handleSignup = () => {
    // setIsLoggedIn(true)
    navigate("/signup");
  };

  const handleLogout = () => {
    // setIsLoggedIn(false)
    logout();
    navigate("/login");
  };

  // console.log(authToken, 'nav');

  const primaryBtnStyle =
    "px-4 py-2 bg-[#42B2A4] hover:bg-[#3ba094] text-white text-base font-medium rounded-md transition duration-150 ease-in-out";
  const secondaryBtnStyle =
    'rounded-md border border-transparent py-2 px-4 text-center text-base font-medium transition-all text-slate-600 hover:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button"';
  const tertiaryBtnStyle =
    "px-4 py-2 bg-transparent hover:bg-[#3ba094] text-[#42B2A4] hover:text-white border-[1.5px] border-[#42B2A4] text-base font-medium rounded-md transition duration-150 ease-in-out";

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-gray-300">
      <div className="flex items-center">
        <div className="text-2xl font-bold w-24 h-auto">
          <img src={logo} alt="Crypto Checks" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {authToken ? (
          <>
            <button onClick={handleLogout} className={secondaryBtnStyle}>
              Logout
            </button>
            <Link
              to={location.pathname == "/" ? "/view-data" : "/"}
              className={tertiaryBtnStyle}
            >
              {location.pathname == "/" ? (
                <div className="flex items-center gap-1">
                  View Data <FaArrowRight size={14}/>{" "}
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <FaArrowLeft size={14}/> Go Back
                </div>
              )}
            </Link>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className={secondaryBtnStyle}>
              Login
            </button>
            <button onClick={handleSignup} className={primaryBtnStyle}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
