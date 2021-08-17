import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../useAuth";
import PostCard from "../Components/PostCard";
import Navbar from "../Components/Navbar";
import {postRequest} from "../RequestController";
import {Link} from "react-router-dom";
import Footer from "../Components/Footer";
import moment from "moment";
import DateLine from "../Components/DateLine";


export default function Posts() {
    const {user} = useContext(AuthContext);
    const [allPosts, setPosts] = useState({});
    const [numPosts, setNumPosts] = useState(0)
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);
    const [months] = useState(['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάϊος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος']);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear())
        setCurrentMonth(months [new Date().getMonth()])
    }, [])


    useEffect(() => {
        if (currentMonth === null || currentYear === null)
            return

        postRequest("/posts").then(({data}) => {

            data = data.sort(function (a, b) {
                return (a.publishedAt < b.publishedAt) ? 0 : ((a.publishedAt > b.publishedAt) ? -1 : 0);
            });

            setNumPosts(data.length);

            if(data.length === 1){
                setPosts(data[0])
                return
            }

            let chunks = {}

            for (let i = 0; i < data.length; i++) {
                let date = moment(data[i].publishedAt, 'YYYY/MM/DD')
                let year = date.format('YYYY')
                let month = date.format('M') - 1


                if (chunks[year] === undefined) {
                    chunks[year] = {}
                }

                if (chunks[year][months[month]] === undefined) {
                    chunks[year][months[month]] = [];
                }

                chunks[year][months[month]] = data;

            }
            setPosts(chunks);
        });
    }, [currentMonth, currentYear]);


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


                {numPosts === 1 && allPosts && (
                    <div className="lg:grid lg:grid-cols-1" style={{width: "600px", margin: "auto"}}>
                        <div
                            key={`anakoinwsi${0}`}
                            data-aos={"fade-up"}
                        >
                            <PostCard props={allPosts}/>
                        </div>
                    </div>
                )}


                {numPosts !== 1 && Object.keys(allPosts).length > 0 && currentMonth !== null && currentYear !== null &&
                Object.keys(allPosts).map((year) => (
                    Object.keys(allPosts[year]).map((month) => (
                        <div key={`anakoinwseis xronias ${year} - ${month}`}>

                            <div className="lg:grid lg:grid-cols-1">
                                <DateLine date={`${month} - ${year}`}/>
                            </div>

                            <div className="lg:grid lg:grid-cols-2">

                                {allPosts[year][month].map((post, k) => (
                                    <div
                                        key={`anakoinwsi - ${k} - ${year} - ${month}`}
                                        data-aos={k % 2 === 0 ? "fade-right" : "fade-left"}
                                    >
                                        <PostCard props={post}/>
                                    </div>
                                ))}

                            </div>


                        </div>
                    ))
                ))
                }

            </section>
            <Footer/>
        </div>
    );
}
