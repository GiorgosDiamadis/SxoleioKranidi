import React, {useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../useAuth";
import PostCard from "../Components/PostCard";
import {Link} from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import PostRequest from "../PostRequest";
import {useHistory} from "react-router";
import {Toast} from "primereact/toast";
import Spinner from "../Components/Spinner";
import TeacherImage from "../Components/TeacherImage";

export default function Home() {
    const {user} = useContext(AuthContext);
    const [latestPosts, setLatestPosts] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const history = useHistory();
    const toast = useRef(null);

    useEffect(() => {
        if (history.location.state && history.location.state.login) {
            toast.current.show({
                severity: "success",
                summary: "Επιτυχής σύνδεση",
                sticky: false,
            });
            history.replace("", null);
        }
        setLoadingPosts(true);
        PostRequest("/posts", {amount: 2})
            .then(({data}) => {
                setLoadingPosts(false);
                setLatestPosts(data);
            })
            .catch((reason) => {
                setLoadingPosts(false);
            });

        setLoadingTeachers(true);
        PostRequest("/teacher/headmasters").then(({data}) => {
            setLoadingTeachers(false);
            setTeachers(data);
        });
    }, []);

    return (
        <div>
            <Navbar/>
            <Toast ref={toast} position={"top-center"}/>
            <header className="showcase text-white relative">
                <div
                    data-aos={"zoom-in"}
                    className="content flex flex-col ml-auto mr-auto left-0 right-0 text-center top-24  sm:top-1/3"
                >
                    <img
                        src="upp.gif"
                        className="logo m-auto w-32 h-32 lg:w-48 lg:h-48"
                        alt=""
                    />
                    <h1 className="text-2xl lg:text-4xl mt-10 leading-tight">
                        1ο ΔΗΜΟΤΙΚΟ ΣΧΟΛΕΙΟ ΚΡΑΝΙΔΙΟΥ
                    </h1>
                </div>
            </header>
            <div className="divider font-bold text-5xl text-center mt-20 mb-20">
                <h1>Το σχολείο μας</h1>
            </div>

            <section id={"about"} className={"relative max-w-7xl mx-auto mt-4"}>
                <div className="">
                    <div className="items-center flex flex-wrap">
                        <div
                            data-aos={"zoom-in"}
                            className="w-full md:w-4/12 ml-auto mr-auto"
                            style={{flex: "0.9"}}
                        >
                            <img
                                src="./images/233600822_872229023647728_234042590613876335_n.jpg"
                                alt=""
                                className=" max-w-full rounded-lg shadow-lg"
                                style={{width: "510px", height: "400px"}}
                            />
                        </div>
                        <div
                            data-aos={"zoom-in"}
                            className="w-full lg:w-7/12 ml-auto mr-auto px-4"
                        >
                            <h3 className="font-bold text-4xl text-center mt-6">
                                Καλώς Ορίσατε
                            </h3>
                            <p className=" mt-4 text-lg leading-loose">
                                Σας καλωσοριζουμε στην ιστοσελίδα του 1ου Δημοτικού Σχολείου
                                Κρανιδίου. Το σχολείο μας είναι 12/θεσιο και αποτελείται από 2
                                κτήρια. Το παλαιό κτήριο είναι χτισμένο το 1931. Στην ιστοσελίδα
                                μας θα βρείτε χρήσιμες πληροφορίες για τη λειτουργία του καθώς
                                και για εκδηλώσεις και δραστηριότητες που πραγματοποιούνται από
                                μαθητές και εκπαιδευτικούς.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="divider font-bold text-5xl text-center mt-20 mb-20">
                <h1>Οι εκπαιδευτικοί μας</h1>
            </div>
            <section id={"about"} className={"relative max-w-7xl mx-auto mt-4"}>
                <div className="items-center flex flex-wrap">
                    {!loadingTeachers &&
                    teachers.map((teacher) => (
                        <TeacherImage
                            name={teacher.name}
                            specialty={teacher.specialty}
                            gender={teacher.gender}
                            headmaster={teacher.headmaster}
                            subheadmaster={teacher.subheadmaster}
                            teacher_id={teacher.teacher_id}
                        />
                    ))}
                </div>
                <div
                    style={{display: "flex", justifyContent: "center"}}
                    className={"mt-5 mb-5"}
                >
                    <Link to={"/teachers"}>
                        <button
                            className="h-10 px-5 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
                            Ολοι οι εκπαιδευτικοί
                        </button>
                    </Link>
                </div>
            </section>

            <div className="divider font-bold text-5xl text-center mt-20 mb-20">
                <h1>Τελευταίες Ανακοινώσεις</h1>
            </div>

            <section
                className="
            latest max-w-7xl mx-auto mt-4"
            >
                <Spinner props={{isLoading: loadingPosts}}/>

                {latestPosts && latestPosts.length === 0 && (
                    <div className="sm:grid sm:grid-cols-1">
                        <div key={`anakoinwsi${0}`} data-aos={"zoom-in"}>
                            <h1 className={"text-2xl text-center"}>
                                Δεν υπάρχουν ανακοινώσεις
                            </h1>
                        </div>
                    </div>
                )}

                {latestPosts && latestPosts.length === 1 && (
                    <div className="">
                        <div
                            key={`anakoinwsi${0}`}
                            data-aos={"zoom-in"}
                            style={{margin: "8px 16px 0px"}}
                        >
                            <PostCard props={latestPosts[0]}/>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1  md:grid-cols-2 mb-2">
                    {latestPosts &&
                    latestPosts.length > 1 &&
                    latestPosts.map((post, i) => (
                        <div
                            key={`anakoinwsi${i}`}
                            data-aos={"zoom-in-up"}
                            style={{margin: "8px 16px 0px"}}
                            className={"mt-2"}
                        >
                            <PostCard props={post}/>
                        </div>
                    ))}
                </div>
                <div
                    style={{display: "flex", justifyContent: "center"}}
                    className={"mt-5 mb-5"}
                >
                    <Link to={"/posts"}>
                        <button
                            className="h-10 px-5 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
                            Ολες οι ανακοινώσεις
                        </button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
