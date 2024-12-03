import { SearchInput } from "./SearchInput";
import { Button } from "./Button";
import { useAppContextInfo } from "../PageContainer";
import { Bell, Menu, PlusCircle, MessageSquare, LogOut, Settings, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Login } from "./Auth/login";
import { Register } from "./Auth/Register";
import { Link } from "react-router-dom";



export const Header = ({
  toggleSidebar,
  openLoginModal,
  isLoginModalOpen,
  closeLoginModal,
  isRegisterModalOpen,
  openRegisterModal,
  closeRegisterModal,
}) => {
  const { user, setUser } = useAppContextInfo();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
  };

  // Manage dropdown outside click listener
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-[#1A1A1B] border-b border-gray-700 text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <span className="text-2xl font-bold">Reddit</span>
      </div>

      {/* Search Input */}
      <SearchInput />

      {/* User Interaction Section */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>

        {user ? (
          <div className="flex items-center space-x-4 relative">
            {/* Quick Actions */}
            <Link to="/submit" aria-label="Create Post">
              <PlusCircle className="h-5 w-5" />
            </Link>
            <Button variant="ghost" size="icon" aria-label="Messages">
              <MessageSquare className="h-5 w-5" />
            </Button>

            {/* User Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              <img
                src={user.photo || "/path/to/default-image.png"}
                alt={`${user.username || "User"}'s profile`}
                className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <div className="flex flex-col">
                    <Link
                      to="/profile"
                      variant="ghost"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-2" />
                      <span className="text-lg">{user.username}</span>
                    </Link>
                    <Link
                      variant="ghost"
                      to="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                    <Button
                      variant="ghost"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log Out</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Login/Signup for Guests
          <div className="flex space-x-2">
            <Button onClick={openRegisterModal} variant="outline" className="hidden sm:block">
              Register
            </Button>
            <Button onClick={openLoginModal} className="hidden sm:block">
              Log In
            </Button>
          </div>
        )}

        {/* Sidebar Toggle for Mobile */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Modals */}
      <Login isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <Register isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
    </header>
  );
};
