import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const BookIcon = () => (
  <svg
    className="w-4 h-4 text-gray-700"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"
    />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Hotels", path: "/rooms" },
    { name: "Experience", path: "/experience" },
    { name: "About", path: "/about" },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openSignIn } = useClerk();
  const location = useLocation();
  const { user, navigate, isOwner, setShowHotelReg } = useAppContext();

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10 || location.pathname !== "/");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2 hover:opacity-90">
        <img
          src={assets.Nest}
          alt="NestHub Logo"
          className={`h-8 w-30 md:h-10 lg:h-12 ${
            isScrolled ? "invert opacity-80 h-7 md:h-9" : ""
          } transition-all duration-300`}
        />
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <div className="flex items-center gap-6 lg:gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.path}
              className={`group flex flex-col gap-0.5 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </a>
          ))}
        </div>

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500 hover:bg-gray-800"
          >
            Login
          </button>
        )}

        {user && (
          <div className="flex items-center gap-4 ml-4">
            <button
              className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${
                isScrolled ? "text-black" : "text-white"
              } transition-all hover:bg-gray-100 hover:bg-opacity-20`}
              onClick={() =>
                isOwner ? navigate("/owner") : setShowHotelReg(true)
              }
            >
              {isOwner ? "Dashboard" : "List Your Hotel"}
            </button>

            <UserButton>
              <UserButton.MenuItems>
                {!isOwner && (
                  <UserButton.Action
                    label="My Bookings"
                    labelIcon={<BookIcon />}
                    onClick={() => navigate("/my-bookings")}
                  />
                )}
              </UserButton.MenuItems>
            </UserButton>
          </div>
        )}
      </div>

      {/* Mobile Nav (Right Side) */}
      <div className="flex items-center gap-3 md:hidden">
        {user && (
          <UserButton>
            <UserButton.MenuItems>
              {!isOwner && (
                <UserButton.Action
                  label="My Bookings"
                  labelIcon={<BookIcon />}
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate("/my-bookings");
                  }}
                />
              )}
            </UserButton.MenuItems>
          </UserButton>
        )}
        <img
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          src={isMenuOpen ? assets.closeIcon : assets.menuIcon}
          alt="menu"
          className={`${isScrolled && "invert"} h-6`}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={assets.closeIcon} alt="close icon" className="h-6" />
        </button>

        {navLinks.map((link, i) => (
          <a
            key={i}
            href={link.path}
            className="hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}

        {!user && (
          <button
            onClick={openSignIn}
            className="bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 mt-4"
          >
            Login
          </button>
        )}

        {user && (
          <button
            className="border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 transition-all"
            onClick={() => {
              isOwner ? navigate("/owner") : setShowHotelReg(true);
              setIsMenuOpen(false);
            }}
          >
            {isOwner ? "Dashboard" : "List Your Hotel"}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
