import React, { useState } from "react";
import { Link } from "react-router";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/AuthSlice";
import { FaUser } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from "react-router";
import { IoIosAdd } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <nav className="bg-gray-800 text-white sticky top-0 z-100 opacity-99">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-amber-300">
            <Link to={"/"} className="text-xl font-bold">
              SNIPPET MANAGER
            </Link>
          </div>
          <div
            className={`hidden md:flex space-x-4 ${
              isAuthenticated ? "visible" : "invisible hidden"
            }`}
          >
            {pathname === "/" && (
              <Link
                to={"/dashboard"}
                className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
              >
                <p>Dashboard</p>
              </Link>
            )}
            {pathname === "/newproject" && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={"/dashboard"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <p className="inline font-semibold">Dashboard</p>
                </Link>
                <Link
                  to={"/addsnippet"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Snippet</p>
                </Link>
              </div>
            )}
            {pathname === "/addcode/snippet/" + id && (
              <div className="grid grid-cols-3 gap-2">
                <Link
                  to={"/dashboard"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <p className="inline font-semibold">Dashboard</p>
                </Link>
                <Link
                  to={"/newproject"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Project</p>
                </Link>
                <Link
                  to={"/addsnippet"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Snippet</p>
                </Link>
              </div>
            )}
            {pathname === "/snippets/" + id && (
              <div className="grid grid-cols-3 gap-2">
                <Link
                  to={"/dashboard"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <p className="inline font-semibold">Dashboard</p>
                </Link>
                <Link
                  to={"/newproject"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Project</p>
                </Link>
                <Link
                  to={"/addsnippet"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Snippet</p>
                </Link>
              </div>
            )}
            {pathname === "/addsnippet" && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={"/dashboard"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <p className="inline font-semibold">Dashboard</p>
                </Link>
                <Link
                  to={"/newproject"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Project</p>
                </Link>
              </div>
            )}
            {pathname === "/dashboard" && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to={"/newproject"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Project</p>
                </Link>
                <Link
                  to={"/addsnippet"}
                  className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
                >
                  <IoIosAdd className="inline" size={20} />
                  <p className="inline font-semibold">Snippet</p>
                </Link>
              </div>
            )}
            <button
              onClick={() => dispatch(logout())}
              className="border-1 border-amber-300 cursor-pointer bg-red-400 p-2 rounded-sm flex items-center space-x-2 hover:text-gray-300 text-sm"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
          <div
            className={`hidden  ${
              isAuthenticated ? "invisible hidden" : "visible md:block"
            }`}
          >
            <Link
              to={"/login"}
              className="border-1 border-amber-300 p-2 rounded-sm  hover:text-gray-300 text-sm"
            >
              <FaUser className="inline" color="orange" />
              <span> Login</span>
            </Link>
          </div>
          <div className="md:hidden md:invisible">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden md:invisible">
          <div className="bg-gray-900 w-full">
            <div className="pt-3 ">
              {pathname === "/" && (
                <Link className="pl-3 hover:text-orange-300" to={"/dashboard"}>
                  Dashboard
                </Link>
              )}
              {pathname === "/dashboard" && (
                <div>
                  <Link
                    className="p-3 hover:text-orange-300"
                    to={"/newproject"}
                  >
                    <IoIosAdd size={20} className="inline" /> Project
                  </Link>
                  <Link
                    className="p-3 hover:text-orange-300 block"
                    to={"/addsnippet"}
                  >
                    <IoIosAdd size={20} className="inline" /> Snippet
                  </Link>
                </div>
              )}
            </div>
            {isAuthenticated && (
              <button className="p-3 text-red-200 cursor-pointer hover:text-red-500 text-lg ">
                <LuLogOut className="inline"></LuLogOut> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
