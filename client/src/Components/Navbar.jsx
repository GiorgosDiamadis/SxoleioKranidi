import React from "react";
import NavLink from "./NavLink";

export default function Navbar() {
    return (
        <nav style={{position:"fixed",zIndex:2}}
             className={"w-full text-white flex items-center  fixed top-0 py-5 px-5"}>
            <ul className={"m-auto"}>
                <NavLink props={{name:"Αρχική",link:"/"}}/>
                <NavLink props={{name:"Ανακοινώσεις",link:"/posts"}}/>
                <NavLink props={{name:"Εκδηλώσεις",link:"/"}}/>
                <NavLink props={{name:"Εκπαδευτικοί",link:"/"}}/>
                <NavLink props={{name:"Επικοινωνία",link:"/"}}/>
            </ul>
        </nav>
    );
}
