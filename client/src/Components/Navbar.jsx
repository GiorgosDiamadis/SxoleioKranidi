import React, {useContext} from "react";
import NavLink from "./NavLink";
import {Link} from "react-router-dom";
import {AuthContext} from "../useAuth";

export default function Navbar() {

    const auth = useContext(AuthContext);
    return (
        <nav style={{position: "fixed", zIndex: 2}}
             className="flex w-full items-center justify-between flex-wrap bg-teal-500 fixed top-0 py-4 px-5">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img src="/upp.gif" className={"w-12 h-12"} alt=""/>
                <span className="font-semibold text-xl md:text-3xl ml-2 tracking-tight">1ο Δημοτικό Σχολείο</span>
            </div>
            <span
                onClick={()=>{
                    let menu = document.getElementById("menu");
                    if(menu){
                        if(menu.classList.contains("hidden")){
                            menu.classList.remove("hidden");
                        }else{
                            menu.classList.add("hidden");
                        }
                    }
                }}
                className="visible relative lg:hidden cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded text-white border-blue-300  hover:border-transparent hover:bg-blue-500  mt-4 lg:mt-0">

                    <i className="fas fa-bars">

                    </i>
                </span>
            <div id={"menu"} className="hidden md:block  w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <Link to={"/"}
                          className="block mt-4 lg:inline-block lg:mt-0 text-white text-center hover:bg-blue-500 lg:mr-4 hover:border-transparent border rounded border-blue-300 px-4 py-2">
                        Αρχική
                    </Link>
                    <Link to={"/posts"}
                          className="block mt-4 lg:inline-block lg:mt-0 text-white text-center hover:bg-blue-500 hover:border-transparent  lg:mr-4 border rounded border-blue-300 px-4 py-2">
                        Ανακοινώσεις
                    </Link>
                    <Link to={"/contact"}
                          className="block mt-4 lg:inline-block lg:mt-0 text-white text-center hover:bg-blue-500 hover:border-transparent border rounded border-blue-300 px-4 py-2">
                        Επικοινωνία
                    </Link>
                </div>
                {auth.user === null ? (
                        <div>
                            <Link to={"/login"}
                                  className="block lg:inline-block text-sm px-4 py-2 leading-none border rounded text-white text-center border-blue-300  hover:border-transparent hover:bg-blue-500  mt-4 lg:mt-0">Σύνδεση</Link>
                        </div>
                    ) :
                    (
                        <div>
                            <a onClick={() => auth.logout()}
                               className="inline-block cursor-pointer text-sm px-4 py-2 leading-none border rounded text-white text-center border-blue-300  hover:border-transparent hover:bg-blue-500  mt-4 lg:mt-0">Αποσύνδεση</a>
                        </div>
                    )
                }
            </div>

        </nav>
    );
}
