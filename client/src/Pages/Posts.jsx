import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../useAuth";
import PostCard from "../Components/PostCard";
import Navbar from "../Components/Navbar";
import { getRequest, postRequest } from "../RequestController";
import { Link } from "react-router-dom";

export default function Posts() {
  const { user } = useContext(AuthContext);
  const [allPosts, setPosts] = useState([]);

  useEffect(() => {
    postRequest("/posts").then(({ data }) => {
      setPosts(data);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <section className="latest max-w-7xl mx-auto mt-24">
        {user && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              data-aos={"fade-down"}
              className="h-10 mr-3 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100"
            >
              <Link to={"/posts/create"}>
                <i className="fas fa-plus"></i>Δημιουργία Ανακοίνωσης
              </Link>
            </button>
          </div>
        )}
        <h1
          data-aos={"fade-up"}
          className={"text-gray-600 font-bold text-3xl text-center mt-6 mb-6"}
        >
          Ανακοινώσεις
        </h1>

        <div className="lg:grid lg:grid-cols-2">
          {allPosts &&
            allPosts.map((post, i) => (
              <div data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}>
                <PostCard props={post} />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
