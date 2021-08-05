import React, {useContext, useEffect} from "react";
import {Card} from "primereact/card"
import {AuthContext} from "../useAuth";

const {postRequest} = require("../RequestController");

export default function PostCard({props}) {
    const {user} = useContext(AuthContext);

    return (
        <article
            className="border:black scale-95 transform transition duration-500 hover:scale-100 hover:bg-blue-200 rounded-xl">
            {user && (<div style={{display: "flex", justifyContent: "center"}} className={" absolute"}>
                <button
                    className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">
                    Επεξεργασία
                </button>
                <button
                    className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">
                    Διαγραφή
                </button>
            </div>)}


            <div className="py-6 px-5">
                <div>
                    <img src="./images/announcement.jpg" alt="Blog Post illustration"
                         className="rounded-xl"/>
                </div>

                <div className="mt-8 flex flex-col justify-between">
                    <header>

                        <div className="mt-4">
                            <h1 className="text-3xl">
                                {props.title}
                            </h1>

                            <span className="mt-2 block text-gray-400 text-xs">
                                        Published <time>{props.publishedAt}</time>
                                    </span>
                        </div>
                    </header>

                    <div className="text-sm mt-4">
                        <p>
                            {props.body}
                        </p>
                    </div>

                    <footer className="flex justify-between items-center mt-8">
                        <div className="flex items-center text-sm">
                            <img src="./upp.gif" className={"w-10 h-10"}/>
                            <div className="ml-3">
                                <h5 className="font-bold">Ο/Η διευθύντης/ια</h5>
                            </div>
                        </div>

                        <div>
                            <a href="#"
                               className="transition-colors duration-300 text-xs font-semibold bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-8"
                            >
                                Read More
                            </a>
                        </div>
                    </footer>
                </div>
            </div>
        </article>

    );
}
