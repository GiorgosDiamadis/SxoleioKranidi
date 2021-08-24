import Navbar from "../Components/Navbar";
import React, {useState} from "react";
import Footer from "../Components/Footer";


export default function Contact() {

    return (
        <div className={"flex flex-col h-screen justify-between"}>
            <Navbar/>
            <h3 data-aos={"zoom-out"} className="hidden md:block mt-32 font-bold text-5xl text-center">
                Επικοινωνία
            </h3>
            <div style={{boxShadow: "0 20px 30px rgba(0, 0, 0, 0.35)"}}
                 data-aos={"zoom-out"}
                 className={"mt-32 lg:mt-0 m-auto flex flex-col justify-center lg:flex-row items-center rounded-2xl p-6 mb-32"}>

                <div>
                    <iframe
                        className={"border-2  border-gray-500 block"}
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1885.1895156642377!2d23.161638291035903!3d37.37804848143678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x55f504576236190e!2zMc6_IM6UzrfOvM6_z4TOuc66z4wgzqPPh86_zrvOtc6vzr8gzprPgc6xzr3Ouc60zq_Ov8-F!5e0!3m2!1sel!2sgr!4v1629306649084!5m2!1sel!2sgr"
                        width="600" height="450" allowFullScreen="" loading="lazy">

                    </iframe>
                    <div className={"flex justify-between"}>
                        <div className={"mr-6 mt-2 mb-2"}>
                            <i className="fas fa-phone-volume text-3xl"></i>
                            <p className={"inline-block text-xl ml-2"}>2754021478</p>
                        </div>
                        <div className={"mr-6 mt-2 mb-2"}>
                            <i className="fas fa-envelope text-3xl"></i>
                            <p className={"inline-block text-xl ml-2"}>mail@1dim-kranid.arg.sch.gr</p>
                        </div>
                    </div>
                </div>
                <div className={"ml-3"}>
                    <form className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-first-name">
                                    Ονομα
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    id="grid-first-name" type="text"/>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-last-name">
                                    Επώνυμο
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-last-name" type="text"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-password">
                                    Email
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-password" type="email" />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                       htmlFor="grid-password">
                                    Μύνημα
                                </label>
                                <textarea className={"form-textarea mt-1 block w-full border-2 border-gray-300"} rows="10"></textarea>
                            </div>
                        </div>
                        <button
                            className="shadow bg-blue-400 hover:bg-blue-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                            type="button">
                            Αποστολή
                        </button>
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
    );
}