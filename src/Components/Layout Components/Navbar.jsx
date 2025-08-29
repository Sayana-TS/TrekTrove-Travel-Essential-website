import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation } from "react-router-dom"; 
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import UserSidebar from "./UserSidebar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation(); 
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin"); // ✅ detect admin routes

  const navigate = useNavigate();

  return (
    <>
      {/* SearchBar (on top of navbar) */}
      {!isAdminPage && (
        <SearchBar show={showSearch} onClose={() => setShowSearch(false)} />
      )}

      <nav className="bg-[#282928] shadow-md px-6 py-6 flex items-center justify-between text-white w-full relative z-40">
        {/* Logo */}
        <div className="text-4xl font-bold text-white cursor-pointer">
          <Link to="/">TrekTrove</Link>
        </div>

        {/* If Admin Page → only logo */}
        {!isAdminPage && (
          <>
            {/* Middle Nav Links */}
            <div className="hidden lg:flex gap-8 mx-12">
              {isHomePage ? (
                <>
                  <ScrollLink
                    to="bestSeller"
                    smooth={true}
                    duration={600}
                    className="hover:text-[#91b474] transition cursor-pointer"
                  >
                    Best Sellers
                  </ScrollLink>
                  <ScrollLink
                    to="collection"
                    smooth={true}
                    duration={600}
                    className="hover:text-[#91b474] transition cursor-pointer"
                  >
                    Collection
                  </ScrollLink>
                  <ScrollLink
                    to="reviews"
                    smooth={true}
                    duration={600}
                    className="hover:text-[#91b474] transition cursor-pointer"
                  >
                    Reviews
                  </ScrollLink>
                  <ScrollLink
                    to="footer"
                    smooth={true}
                    duration={600}
                    className="hover:text-[#91b474] transition cursor-pointer"
                  >
                    Contact
                  </ScrollLink>
                </>
              ) : null}
            </div>

            {/* Right - Actions */}
            <div className="flex items-center space-x-6 text-xl me-4">
              {/* Search Button */}
              <button onClick={() => setShowSearch(true)}>
                <FiSearch className="transform transition-transform duration-300 hover:scale-125 cursor-pointer" />
              </button>

              <FiUser
                onClick={() => setSidebarOpen(true)}
                className="transform transition-transform duration-300 hover:scale-125 cursor-pointer"
              />
              <FiShoppingBag
                onClick={() => navigate("/cart")}
                className="transform transition-transform duration-300 hover:scale-125 cursor-pointer"
              />

              {/* Hamburger (Mobile only) */}
              <button
                className="lg:hidden text-2xl"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FiX /> : <FiMenu />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="absolute top-20 left-0 w-full bg-[#282928] flex flex-col items-center space-y-6 py-6 lg:hidden z-30">
                {isHomePage ? (
                  <>
                    <ScrollLink
                      to="bestSeller"
                      smooth={true}
                      duration={600}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-[#91b474] transition"
                    >
                      Best Sellers
                    </ScrollLink>
                    <ScrollLink
                      to="collection"
                      smooth={true}
                      duration={600}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-[#91b474] transition"
                    >
                      Collection
                    </ScrollLink>
                    <ScrollLink
                      to="reviews"
                      smooth={true}
                      duration={600}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-[#91b474] transition"
                    >
                      Reviews
                    </ScrollLink>
                    <ScrollLink
                      to="footer"
                      smooth={true}
                      duration={600}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-[#91b474] transition"
                    >
                      Contact
                    </ScrollLink>
                  </>
                ) : null}
              </div>
            )}

            {/* Sidebar */}
            <UserSidebar
              isOpen={isSidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </>
        )}
      </nav>
    </>
  );
};

export default Navbar;
