import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../useAuth";
import moment from "moment";
import {Link} from "react-router-dom";
import Spinner from "./Spinner";
import PostRequest from "../PostRequest";


export default function PostCard({props}) {
    const {user} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const deletePost = () => {
        setIsLoading(true);
        PostRequest("/posts/delete", {post_id: props.post_id}).then((res) => {
            setIsLoading(false);
            window.location.reload()
        }).catch((err) => {
            console.log(err.response)
            setIsLoading(false);
        });
    }


    return (
        <>
            <Spinner props={{isLoading}}/>
            <article
                className={`border-2 ${isDeleted ? "invisible" : ""} border-gray-500 scale-95 transform transition duration-500 hover:scale-100 hover:bg-blue-200 rounded-xl`}>
                {user && (
                    <div
                        style={{display: "flex", justifyContent: "center"}}
                        className={" absolute"}
                    >
                        <Link to={`/posts/update/${props.post_id}`}>
                            <button
                                className="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">
                                Επεξεργασία
                            </button>
                        </Link>

                        <button
                            onClick={deletePost}
                            className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800">
                            Διαγραφή
                        </button>
                    </div>
                )}

                <div className="py-6 px-5">
                    <div dangerouslySetInnerHTML={{__html: props.imgURL}}>

                    </div>

                    <div className="flex flex-col justify-between">
                        <header>
                            <div className="mt-4">
                                <h1 className="text-4xl">{props.title}</h1>

                                <span className="mt-2 block text-gray-400 text-sm">
                Δημοσιεύτηκε στις  <time>{moment(props.publishedAt).format("DD-MM-YYYY")}</time>
              </span>
                            </div>
                        </header>

                        <div
                            className="text-md mt-4"
                            style={{
                                overflow: "hidden",
                                height: "40px",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                            dangerouslySetInnerHTML={{__html: props.summary}}
                        >

                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center text-sm">
                                <img src="./upp.gif" className={"w-10 h-10"}/>
                                <div className="ml-3">
                                    <h5 className="font-bold">Διεύθυνση Σχολείου</h5>
                                </div>
                            </div>

                            <div>
                                <Link
                                    to={`/posts/${props.post_id}`}
                                    className="transition-colors duration-300 text-xs font-semibold bg-gray-200 hover:bg-gray-300 rounded-full py-2 px-8"
                                >
                                    Περισσότερα
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>

    );
}
