import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/Spinner";
import TeacherImage from "../Components/TeacherImage";
import PostRequest from "../PostRequest";
import {AuthContext} from "../useAuth";
import TeacherLine from "../Components/TeacherLine";

export default function Teachers() {
    const [loading, isLoading] = useState(false);
    const auth = useContext(AuthContext);
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false);

    useEffect(() => {
        setLoadingTeachers(true);
        PostRequest("/teacher/").then(({data}) => {
            setLoadingTeachers(false);
            setTeachers(data);
        });
    }, []);

    return (
        <div className={"flex flex-col h-screen justify-between"}>
            <Navbar/>
            <Spinner props={{isLoading: loadingTeachers}}/>

            <section className="latest w-full mx-auto mt-20">
                {auth.user && (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Link to={"/teachers/create"}>
                            <button
                                data-aos={"zoom-in"}
                                className="h-10 mr-3 px-5 text-gray-500 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100"
                            >
                                <i className="fas fa-plus"></i>Δημιουργία Εκπαιδευτικού
                            </button>
                        </Link>
                    </div>
                )}

                <h1 className="text-5xl text-center mt-5">Οι εκπαιδευτικοί μας</h1>

                <div className="items-center flex flex-wrap">
                    <div
                        data-aos={"zoom-in"}
                        className="container mx-auto max-w-5xl rounded-lg overflow-hidden my-2 bg-white"
                    >
                        <table className="w-full">
                            <thead>
                            <tr>
                                <th>Ονοματεπώνυμο</th>
                                <th>Ειδικότητα</th>
                                {auth.user && (<th>
                                    Ενέργειες
                                </th>)}
                            </tr>
                            </thead>
                            <tbody>
                            {teachers.map((teacher) => (<TeacherLine name={teacher.name} specialty={teacher.specialty}
                                                                     gender={teacher.gender}
                                                                     teacher_id={teacher.teacher_id}
                            />))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>

            <Footer/>
        </div>
    );
}
