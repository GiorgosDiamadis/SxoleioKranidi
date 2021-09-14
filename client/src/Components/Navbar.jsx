import React, { useContext } from "react";
import NavLink from "./NavLink";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../useAuth";

export default function Navbar() {
  const auth = useContext(AuthContext);
  let history = useHistory();
  return (
    <nav className=" w-full shadow-lg" style={{ position: "fixed", zIndex: 2 }}>
      <div className=" px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <img src="/upp.gif" alt="Logo" className="h-8 w-8 mr-2" />
                <span className=" logo-text text-white text-lg">
                  1ο Δημοτικό Σχολείο
                </span>
              </a>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              <Link
                to={"/"}
                className={`py-4 px-2 ${
                  history.location.pathname === "/"
                    ? "text-blue-300"
                    : "text-white "
                } hover:text-blue-300 ${
                  history.location.pathname === "/"
                    ? "border-b-4 border-blue-300"
                    : ""
                } `}
              >
                Αρχική
              </Link>

              <Link
                to={"/posts"}
                className={`py-4 px-2 ${
                  history.location.pathname === "/posts"
                    ? "text-blue-300"
                    : "text-white "
                } hover:text-blue-300 ${
                  history.location.pathname === "/posts"
                    ? "border-b-4 border-blue-300"
                    : ""
                } `}
              >
                Ανακοινώσεις
              </Link>
              <Link
                to={"/teachers"}
                className={`py-4 px-2 ${
                  history.location.pathname === "/teachers"
                    ? "text-blue-300"
                    : "text-white "
                } hover:text-blue-300 ${
                  history.location.pathname === "/teachers"
                    ? "border-b-4 border-blue-300"
                    : ""
                } `}
              >
                Eκπαιδευτικοί
              </Link>
              <Link
                to={"/contact"}
                className={`py-4 px-2 ${
                  history.location.pathname === "/contact"
                    ? "text-blue-300"
                    : "text-white "
                } hover:text-blue-300 ${
                  history.location.pathname === "/contact"
                    ? "border-b-4 border-blue-300"
                    : ""
                } `}
              >
                Επικοινωνία
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-3 ">
            {auth.user === null ? (
              <Link
                to={"/login"}
                className={`py-4 px-2 ${
                  history.location.pathname === "/login"
                    ? "text-blue-300"
                    : "text-white "
                } hover:text-blue-300 ${
                  history.location.pathname === "/login"
                    ? "border-b-4 border-blue-300"
                    : ""
                } `}
              >
                Σύνδεση
              </Link>
            ) : (
              <a
                onClick={() => auth.logout()}
                className={`py-4 cursor-pointer px-2 ${
                  history.location.pathname === "/login"
                    ? "text-blue-300"
                    : "text-white "
                } hover:text-blue-300 ${
                  history.location.pathname === "/login"
                    ? "border-b-4 border-blue-300"
                    : ""
                } `}
              >
                Αποσύνδεση
              </a>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => {
                let menu = document.getElementById("menu");
                if (menu) {
                  if (menu.classList.contains("hidden")) {
                    menu.classList.remove("hidden");
                  } else {
                    menu.classList.add("hidden");
                  }
                }
              }}
            >
              <svg
                className=" w-6 h-6 text-white hover:text-blue-500 "
                x-show="!showMenu"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden mobile-menu" id={"menu"}>
        <ul className="">
          <li>
            <Link
              to={"/"}
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 hover:text-white "
            >
              Αρχική
            </Link>
          </li>
          <li>
            <Link
              to={"/posts"}
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 "
            >
              Ανακοινώσεις
            </Link>
          </li>
          <li>
            <Link
              to={"/teachers"}
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 "
            >
              Εκπαιδευτικοί
            </Link>
          </li>
          <li>
            <Link
              to={"/contact"}
              className="block text-sm px-2 py-4 text-white hover:bg-blue-500 hover:text-white"
            >
              Επικοινωνία
            </Link>
          </li>
          <li>
            {auth.user === null ? (
              <Link
                to={"/login"}
                className="block text-sm px-2 py-4 text-white hover:bg-blue-500 hover:text-white"
              >
                Σύνδεση
              </Link>
            ) : (
              <a
                onClick={() => {
                  auth.logout();
                }}
                className="block  text-sm px-2 py-4 text-white hover:bg-blue-500 hover:text-white"
              >
                Αποσύνδεση
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
