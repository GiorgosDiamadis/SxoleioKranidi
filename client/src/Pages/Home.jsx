import React, {useContext, useEffect} from "react";
import {Redirect, useHistory} from "react-router";
import {AuthContext} from "../useAuth";
import PostCard from "../Components/PostCard";
import PostCardFeatured from "../Components/PostCardFeatured";

const {postRequest} = require("../RequestController");

export default function Home() {
    const {user} = useContext(AuthContext);
    return (
        <div>
            <header className="showcase">
                <section className="services" style={{position: "absolute", zIndex: 1}}>
                    <div className="container grid-4 center">
                        <div className="nav-link">
                            <h3>Το σχολείο μας</h3>
                        </div>
                        <div className="nav-link">
                            <h3>Ανακοινώσεις</h3>
                        </div>
                        <div className="nav-link">
                            <h3>Εκπαιδευτικοί</h3>
                        </div>

                        <div className="nav-link">
                            <h3>Επικοινωνία</h3>
                        </div>
                    </div>
                </section>
                <div className="content" data-aos={'fade-in'}>
                    <img src="upp.gif" className="logo" alt=""/>
                    <div className="text-6xl mt-10 leading-tight">1ο ΔΗΜΟΤΙΚΟ ΣΧΟΛΕΙΟ ΚΡΑΝΙΔΙΟΥ</div>
                </div>
            </header>

            <section id={"about"} className={"relative py-20"} data-aos={'zoom-in'}>
                <div className="container mx-auto px-4">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full md:w-5/12 ml-auto mr-auto px-4" >
                            <img src="./images/announcement.jpg" alt="" className="max-w-full rounded-lg shadow-lg"/>
                        </div>
                        <div className="w-full md:w-6/12 ml-auto mr-auto px-4 ">
                            <div className="md:pr-12">

                                <h3 className="text-4xl uppercase  font-semibold">Welcome</h3>
                                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                                    Καλώς ήρθατε στην ιστοσελίδα του Δημοτικού
                                    Σχολείου Ερμιόνης!!! Οι δάσκαλοι και οι
                                    μαθητές του Σχολείου μας σας καλωσορίζουν στον ιστότοπό τους. Θα χαρούμε πολύ να σας
                                    ξεναγήσουμε στο σχολείο μας και στον τόπο μας. Στον διαδικτυακό αυτό τόπο θα βρείτε
                                    χρήσιμες πληροφορίες για δραστηριότητες και εκδηλώσεις που αφορούν το Σχολείο μας,
                                    τη
                                    λειτουργία του καθώς και χρηστικές πληροφορίες για τον τόπο μας, την Ερμιονίδα. Καλή
                                    σας
                                    ξενάγηση!!!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="latest bg-light max-w-7xl mx-auto mt-4" data-aos={'zoom-in'}>
                <h1 className={"text-gray-600 font-bold text-3xl text-center mt-6"}>Τελευταίες ανακοινώσεις</h1>
                <PostCardFeatured />
                <div className="lg:grid lg:grid-cols-2">
                    <PostCard/>
                    <PostCard/>
                </div>
            </section>
            <footer className="center bg-dark">
                <p>
                    &copy;
                </p>
            </footer>
        </div>
    );
}
