import React, {useContext, useEffect} from "react";

import {AuthContext} from "../useAuth";
import PostCard from "../Components/PostCard";
import PostCardFeatured from "../Components/PostCardFeatured";

const {postRequest} = require("../RequestController");

export default function Posts() {
    const {user} = useContext(AuthContext);


    return (
        <section className="latest max-w-7xl mx-auto mt-4">
            {user && (
                <div style={{display: "flex", justifyContent: "center"}} className={"p-10"}>
                    <button
                        className="h-10 mr-3 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
                        <i className="fas fa-plus"></i> Δημιουργία Ανακοίνωσης
                    </button>
                </div>
            )}
            <h1 className={"text-gray-600 font-bold text-3xl text-center mt-6 mb-6"}>Ανακοινώσεις</h1>
            <div data-aos={'zoom-in'}>
                <PostCardFeatured/>
            </div>

            <div className="lg:grid lg:grid-cols-2" data-aos={'zoom-in'}>
                <PostCard/>
                <PostCard/>
            </div>
            <div className="lg:grid lg:grid-cols-3" data-aos={'zoom-in'}>
                <PostCard/>
                <PostCard/>
                <PostCard/>
            </div>
        </section>

    );
}
