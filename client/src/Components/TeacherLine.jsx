import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import PostRequest from "../PostRequest";
import {AuthContext} from "../useAuth";
import Spinner from "./Spinner";

export default function TeacherLine({
                                        name,
                                        specialty,
                                        gender,
                                        teacher_id,
                                    }) {
    const user = useContext(AuthContext).user;
    const [isLoading, setIsLoading] = useState(false);

    return (


        <>
            <Spinner props={{isLoading}}/>
            <tr>
                <td>
                    <img className={"inline-block w-10 h-10 mr-5"}
                         src={`${gender === "male" ? "/male.png" : "/female.png"} `} alt=""/>

                    {name}

                </td>
                <td>{specialty}</td>
                {user && (
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Link
                            to={{
                                pathname: `/teachers/update/${teacher_id}`,
                            }}
                        >
                            <button
                                className="h-7 px-3 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-md focus:shadow-outline hover:bg-blue-700">
                                Επεξεργασία
                            </button>
                        </Link>

                        <button
                            onClick={() => {
                                setIsLoading(true);
                                PostRequest("/teacher/delete", {teacher_id})
                                    .then(() => {
                                        setIsLoading(false);
                                        window.location.reload();
                                    })
                                    .catch((reason) => {
                                        console.log(reason);
                                    });
                            }}
                            className="h-7 px-3 m-2 text-red-700 transition-colors duration-150  rounded-md focus:shadow-outline hover:bg-red-700 hover:text-white"
                        >
                            Διαγραφή
                        </button>
                    </div>
                )}
            </tr>
        </>

    );
}
