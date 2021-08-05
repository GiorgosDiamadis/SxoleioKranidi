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
            <header className="showcase text-white" >
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
                <div data-aos={"zoom-out"} className="content" >
                    <img src="upp.gif" className="logo" alt=""/>
                    <div className="text-6xl mt-10 leading-tight">1ο ΔΗΜΟΤΙΚΟ ΣΧΟΛΕΙΟ ΚΡΑΝΙΔΙΟΥ</div>
                </div>
            </header>

            <section id={"about"} className={"relative py-20"} data-aos={'zoom-in'}>
                <div className="px-16">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                            <img src="./images/announcement.jpg" alt="" className="max-w-full rounded-lg shadow-lg"/>
                        </div>
                        <div className="w-full md:w-6/12 ml-auto mr-auto px-4">

                            <h3 className="text-gray-600 font-bold text-4xl text-center mt-6">Kalws orisate</h3>
                            <p className="mt-4 text-lg leading-loose text-gray-500">
                                KEIMENO KALWS ORISMATOS
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias, dicta dolorum
                                incidunt iure molestiae nam neque numquam provident quam quia quidem sit tempora tenetur
                                unde vel velit voluptas voluptate? Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. Atque in odit voluptates. Nostrum, obcaecati, saepe! Alias assumenda, autem
                                cumque, expedita, fugiat id inventore ipsa maxime mollitia nihil quia repellat saepe.
                            </p>
                            <div style={{display: "flex", justifyContent: "center"}} className={"mt-5"}>
                                <button
                                    className="h-10 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">Ksenagisi
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            <section className="latest max-w-7xl mx-auto mt-4" data-aos={'zoom-in'}>
                <h1 className={"text-gray-600 font-bold text-3xl text-center mt-6 mb-6"}>Τελευταίες ανακοινώσεις</h1>
                <div style={{display: "flex", justifyContent: "center"}} className={"mt-5 mb-5"}>
                    <button
                        className="h-10 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">Deite Oles
                        tis anakoinwseis
                    </button>
                </div>
                <PostCardFeatured/>
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
