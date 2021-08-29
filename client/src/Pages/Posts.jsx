import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../useAuth";
import PostCard from "../Components/PostCard";
import Navbar from "../Components/Navbar";

import {Link} from "react-router-dom";
import Footer from "../Components/Footer";
import moment from "moment";
import {Dropdown} from "primereact/dropdown";
import PostRequest from "../PostRequest";
import Spinner from "../Components/Spinner";


export default function Posts() {
    const {user} = useContext(AuthContext);
    const [allPosts, setPosts] = useState({});
    const [currentMonth, setCurrentMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(null);
    const [months] = useState(['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάϊος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος']);

    const [isLoading,setIsLoading] = useState(false)

    const monthOptions = [
        {name: 'Ιανουάριος'},
        {name: 'Φεβρουάριος'},
        {name: 'Μάρτιος'},
        {name: 'Απρίλιος'},
        {name: 'Μάϊος'},
        {name: 'Ιούνιος'},
        {name: 'Ιούλιος'},
        {name: 'Αύγουστος'},
        {name: 'Σεπτέμβριος'},
        {name: 'Οκτώβριος'},
        {name: 'Νοέμβριος'},
        {name: 'Δεκέμβριος'},
    ];

    const yearOptions = [
        {name: '2021'},
        {name: '2022'},
        {name: '2023'},
        {name: '2024'},
        {name: '2025'},
        {name: '2026'},
        {name: '2027'},
        {name: '2028'},
        {name: '2029'},
        {name: '2030'},
        {name: '2031'},
        {name: '2032'},
    ]
    useEffect(() => {
        setCurrentYear({name: new Date().getFullYear().toString()})
        setCurrentMonth({name: months [new Date().getMonth()]})
    }, [])


    useEffect(() => {
        if (currentMonth === null || currentYear === null)
            return

        setIsLoading(true);
        PostRequest("/posts").then(({data}) => {

            data = data.sort(function (a, b) {
                return (a.publishedAt < b.publishedAt) ? 0 : ((a.publishedAt > b.publishedAt) ? -1 : 0);
            });

            setIsLoading(false);

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
        }).catch((reason)=>{
            setIsLoading(false)
        });
    }, [currentMonth, currentYear]);


    return (
        <div className={"flex flex-col h-screen justify-between"}>
            <Navbar/>
            <Spinner props={{isLoading}}/>

            <section className="latest max-w-7xl mx-auto mt-24">
                {user && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Link to={"/posts/create"}>
                            <button
                                data-aos={"zoom-in"}
                                className="h-10 mr-3 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100"
                            >

                                <i className="fas fa-plus"></i>Δημιουργία Ανακοίνωσης
                            </button>
                        </Link>

                    </div>
                )}
                <h1
                    data-aos={"zoom-in"}
                    className={"font-bold text-5xl text-center mt-6 mb-6"}
                >
                    Ανακοινώσεις
                </h1>

                <h2
                    data-aos={"zoom-in"}
                    className={"text-gray-600 font-bold text-xl text-center mt-6 mb-2"}>Ημερομηνία</h2>
                <div
                    data-aos={"zoom-in"}
                    className=" flex flex-row justify-center  p-mb-5 p-5">
                    <Dropdown value={currentMonth} className={"bloc"} onChange={(e) => {
                        setCurrentMonth(e.value)
                    }} options={monthOptions} optionLabel="name" placeholder="Μήνας"/>
                    <Dropdown onChange={(e) => {
                        setCurrentYear(e.value)
                    }} value={currentYear} options={yearOptions} optionLabel="name" placeholder="Χρονιά"/>
                </div>

                {(Object.keys(allPosts).length === 0 || !allPosts[currentYear.name] ||
                !allPosts[currentYear.name][currentMonth.name] ||
                    allPosts[currentYear.name][currentMonth.name].length === 0) && (
                    <div className=" mb-2">
                        <div
                            key={`anakoinwsi${0}`}
                            data-aos={"zoom-in"}
                        >
                            {currentMonth && currentYear && !isLoading && (<h1 className={"text-2xl text-center"}>Δεν υπάρχουν ανακοινώσεις για {currentMonth.name} - {currentYear.name}</h1>)}

                        </div>

                    </div>
                )}


                {Object.keys(allPosts).length > 0 &&
                allPosts[currentYear.name] &&
                allPosts[currentYear.name][currentMonth.name] &&
                allPosts[currentYear.name][currentMonth.name].length === 1 &&
                (
                    <div className="mb-2" >
                        <div
                            key={`anakoinwsi${0}`}
                            data-aos={"zoom-in"}
                        >

                            <PostCard props={allPosts[currentYear.name][currentMonth.name][0]}/>
                        </div>
                    </div>
                )}


                <div className="grid grid-cols-1  md:grid-cols-2 mb-2">

                    {Object.keys(allPosts).length > 0 &&
                    allPosts[currentYear.name] &&
                    allPosts[currentYear.name][currentMonth.name] &&
                    allPosts[currentYear.name][currentMonth.name].length > 1 &&
                    allPosts[currentYear.name][currentMonth.name].map((post, k) => (
                        <div
                            key={`anakoinwsi - ${k} - ${currentYear.name} - ${currentMonth.name}`}
                            style={{margin:"8px 16px 0px"}}
                            data-aos={"zoom-in"}
                             className={"mt-2"} >
                            <PostCard props={post}/>
                        </div>
                    ))}

                </div>
            </section>

            <Footer/>
        </div>
    );
}
