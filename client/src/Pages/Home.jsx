import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import { AuthContext } from "../useAuth";
import PostCard from "../Components/PostCard";
import PostCardFeatured from "../Components/PostCardFeatured";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getRequest } from "../RequestController";

const { postRequest } = require("../RequestController");

export default function Home() {
  const { user } = useContext(AuthContext);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    postRequest("posts/delete", { amount: 3 }).then(({ data }) => {
      // setLatestPosts(data);
      console.log("data")
    }).catch((reason)=>{
      console.log(reason)
    });
  }, []);

  return (
    <div>
      <Navbar />
      <header className="showcase text-white">
        <div data-aos={"zoom-out"} className="content">
          <img src="upp.gif" className="logo" alt="" />
          <div className="text-6xl mt-10 leading-tight">
            1ο ΔΗΜΟΤΙΚΟ ΣΧΟΛΕΙΟ ΚΡΑΝΙΔΙΟΥ
          </div>
        </div>
      </header>

      <section id={"about"} className={"relative max-w-6xl mx-auto mt-4"}>
        <div className="px-16">
          <div className="items-center flex flex-wrap">
            <div
              className="w-full md:w-4/12 ml-auto mr-auto px-4"
              data-aos={"fade-right"}
            >
              <img
                src="./images/announcement.jpg"
                alt=""
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>
            <div
              className="w-full md:w-7/12 ml-auto mr-auto px-4"
              data-aos={"fade-left"}
            >
              <h3 className=" font-bold text-5xl text-center mt-6">
                Καλώς Ορίσατε
              </h3>
              <p className="mt-4 text-lg leading-loose">
                Σας καλωσοριζουμε στην ιστοσελίδα του 1ου Δημοτικού Σχολείου
                Κρανιδίου. Το σχολείο μας είναι 12/θεσιο και αποτελείται από 2
                κτήρια. Το παλαιό κτήριο είναι χτισμένο το 1931. Στην ιστοσελίδα
                μας θα βρείτε χρήσιμες πληροφορίες για τη λειτουργία του καθώς
                και για εκδηλώσεις και δραστηριότητες που πραγματοποιούνται από
                μαθητές και εκπαιδευτικούς.
              </p>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                className={"mt-5"}
              >
                <button className="h-10 px-5 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
                  Το σχολείο μας
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="latest max-w-7xl mx-auto mt-4" data-aos={"zoom-i"}>
        <h1 className={"font-bold text-5xl text-center mt-6 mb-6"}>
          Τελευταίες ανακοινώσεις
        </h1>

        <div className="lg:grid lg:grid-cols-2">
          {latestPosts && latestPosts[0] && (
            <div data-aos={"fade-up"}>
              <PostCard props={latestPosts[0]} />
            </div>
          )}

          {latestPosts &&
            latestPosts.map(
              (post, i) =>
                i > 0 && (
                  <div data-aos={"fade-up"}>
                    <PostCard props={latestPosts[i]} />
                  </div>
                )
            )}
        </div>
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className={"mt-5 mb-5"}
        >
          <button className="h-10 px-5 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
            <Link to={"/posts"}>Ολες οι ανακοινώσεις</Link>
          </button>
        </div>
      </section>
      <footer className="center bg-dark">
        <p>&copy;</p>
      </footer>
    </div>
  );
}
