import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import PostRequest from "../PostRequest";
import { AuthContext } from "../useAuth";
import Spinner from "./Spinner";

export default function TeacherImage({
  name,
  specialty,
  gender,
  headmaster,
  subheadmaster,
  teacher_id,
}) {
  const user = useContext(AuthContext).user;
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div
      data-aos={"zoom-in"}
      className="container mx-auto max-w-xs rounded-lg overflow-hidden my-2 bg-white"
    >
      <Spinner props={{ isLoading }} />

      {user && (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            to={{
              pathname: `/teachers/update/${teacher_id}`,
            }}
          >
            <button className="h-7 px-3 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-md focus:shadow-outline hover:bg-blue-700">
              Επεξεργασία
            </button>
          </Link>

          <button
            onClick={() => {
              setIsLoading(true);
              PostRequest("/teacher/delete", { teacher_id })
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

      <div className="relative mb-6">
        <img
          className="w-full w-18 h-42"
          src={`${gender === "male" ? "/male.png" : "/female.png"} `}
          alt="Profile picture"
        />
        <div className="text-center absolute w-full">
          <h1 className="text-black tracking-wide uppercase text-lg font-bold">
            {name}
          </h1>
          <p className="text-black text-sm">{specialty}</p>
        </div>
      </div>
    </div>
  );
}
