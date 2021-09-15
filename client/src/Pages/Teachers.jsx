import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/Spinner";
import Teacher from "../Components/Teacher";
import PostRequest from "../PostRequest";
import { AuthContext } from "../useAuth";

export default function Teachers() {
  const [loading, isLoading] = useState(false);
  const auth = useContext(AuthContext);
  const [teachers, setTeachers] = useState([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);

  useEffect(() => {
    setLoadingTeachers(true);
    PostRequest("/teacher/").then(({ data }) => {
      setLoadingTeachers(false);
      setTeachers(data);
    });
  }, []);

  return (
    <div className={"flex flex-col h-screen justify-between"}>
      <Navbar />
      <Spinner props={{ isLoading: loadingTeachers }} />

      <section className="latest max-w-7xl mx-auto mt-20">
        {auth.user && (
          <div style={{ display: "flex", justifyContent: "center" }}>
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

        <h1 className="text-5xl text-center mt-20">Οι εκπαιδευτικοί μας</h1>

        <div className="items-center flex flex-wrap">
          {!loadingTeachers &&
            teachers.map((teacher) => (
              <Teacher
                name={teacher.name}
                specialty={teacher.specialty}
                gender={teacher.gender}
                headmaster={teacher.headmaster}
                subheadmaster={teacher.subheadmaster}
                teacher_id={teacher.teacher_id}
              />
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
