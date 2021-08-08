import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../useAuth";
import PostCard from "../Components/PostCard";
import Navbar from "../Components/Navbar";
import {getRequest, postRequest} from "../RequestController";
import {Link} from "react-router-dom";
import Footer from "../Components/Footer";

export default function Posts() {
    const {user} = useContext(AuthContext);
    const [allPosts, setPosts] = useState([]);

    useEffect(() => {
        postRequest("/posts").then(({data}) => {
            setPosts(data);
        });
    }, []);

    return (
        <div>
            <Navbar/>
            <section className="latest max-w-7xl mx-auto mt-24">
                {user && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Link to={"/posts/create"}>
                            <button
                                data-aos={"fade-down"}
                                className="h-10 mr-3 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100"
                            >

                                <i className="fas fa-plus"></i>Δημιουργία Ανακοίνωσης
                            </button>
                        </Link>

                    </div>
                )}
                <h1
                    data-aos={"fade-up"}
                    className={"text-gray-600 font-bold text-3xl text-center mt-6 mb-6"}
                >
                    Ανακοινώσεις
                </h1>

                {allPosts && allPosts.length === 1 && (

                    <div className="lg:grid lg:grid-cols-1" style={{width: "600px", margin: "auto"}}>
                        <div
                            key={`anakoinwsi${0}`}
                            data-aos={"fade-up"}
                        >
                            <PostCard props={allPosts[0]}/>
                        </div>

                    </div>

                )}

                <div className="lg:grid lg:grid-cols-2">
                    {allPosts && allPosts.length > 1 &&
                    allPosts.map((post, i) => (
                        <div
                            key={`anakoinwsi${i}`}
                            data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
                        >
                            <PostCard props={post}/>
                        </div>
                    ))}
                </div>
            </section>
            <Footer/>
        </div>
    );
}
