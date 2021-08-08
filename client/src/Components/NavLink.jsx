import React from "react";
import {Link} from "react-router-dom";

export default function NavLink({props}) {
    return (
        <Link to={`${props.link}`}
              className={"ml-10 transition duration-500 border-2 border-blue-500 hover:bg-blue-500 rounded-lg text-xl py-2 px-2"}>
            <li className={"inline-block"}>

                {props.name}

            </li>
        </Link>
    )
}