import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../useAuth";
import moment from "moment";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import PostRequest from "../PostRequest";

export default function PostCard({ props }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const deletePost = () => {
    setIsLoading(true);
    PostRequest("/posts/delete", { post_id: props.post_id })
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Spinner props={{ isLoading }} />
      <article
        style={{
          maxWidth: "600px",
          boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, .3)",
        }}
        className={`${
          isDeleted ? "invisible" : ""
        } xl:w-cardOne m-auto bg-gray-200 scale-100 transform transition duration-500 hover:bg-blue-200 rounded-md`}
      >
        <div className="py-6 px-5">
          <div className="flex justify-between mb-4 items-center">
            <div className="flex items-center text-sm">
              <img src="./upp.gif" className={"w-10 h-10"} />
              <div className="ml-3">
                <h5 className="font-bold">Διεύθυνση Σχολείου</h5>
              </div>
            </div>

            <div>
              <Link
                to={`/posts/${props.post_id}`}
                className="py-2 px-3 m-2 text-blue-100 transition-colors duration-150 bg-green-600 rounded-md focus:shadow-outline hover:bg-green-700"
              >
                Περισσότερα
              </Link>
            </div>
          </div>

          <div dangerouslySetInnerHTML={{ __html: props.imgURL }}></div>

          <div className="flex flex-col justify-between">
            <header>
              <div className="mt-4">
                <h1 className="text-4xl">{props.title}</h1>

                <span className="mt-2 block text-gray-400 text-sm">
                  Δημοσιεύτηκε στις{" "}
                  <time>{moment(props.publishedAt).format("DD-MM-YYYY")}</time>
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
              dangerouslySetInnerHTML={{ __html: props.summary }}
            ></div>
          </div>
        </div>

        {user && (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link to={`/posts/update/${props.post_id}`}>
              <button className="h-7 px-3 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-md focus:shadow-outline hover:bg-blue-700">
                Επεξεργασία
              </button>
            </Link>

            <button
              onClick={deletePost}
              className="h-7 px-3 m-2 text-red-700 transition-colors duration-150  rounded-md focus:shadow-outline hover:bg-red-700 hover:text-white"
            >
              Διαγραφή
            </button>
          </div>
        )}
      </article>
    </>
  );
}
