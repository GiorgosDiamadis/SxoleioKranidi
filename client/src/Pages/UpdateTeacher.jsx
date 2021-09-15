import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Components/Navbar";

import axios from "axios";
import { useHistory, useParams, useLocation } from "react-router-dom";
import Spinner from "../Components/Spinner";
import PostRequest from "../PostRequest";

export default function UpdateTeacher() {
  const toast = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [teacher_id] = useState(useParams().teacher_id);
  let history = useHistory();

  const [teacherData, setTeacherData] = useState({
    name: "",
    specialty: "",
    gender: "",
    headmaster: 0,
    subheadmaster: 0,
  });

  useEffect(() => {
    if (errors && errors.length > 0) {
      showError(errors);
    }
  }, [errors]);

  const showError = (errors) => {
    var errorMessage = "";
    errors.forEach((error) => {
      errorMessage += error.msg + " ";
    });
    toast.current.show({
      severity: "error",
      summary: "Αποτυχία",
      detail: errorMessage,
      sticky: true,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    PostRequest("/teacher/update", teacherData)
      .then((response) => {
        setIsLoading(false);
        history.push("/teachers/");
      })
      .catch((res) => {
        setIsLoading(false);
        setErrors(res.response.data.errors);
      });
  };

  useEffect(() => {
    if (teacher_id) {
      setIsLoading(true);
      PostRequest("/teacher/get", { teacher_id })
        .then(({ data }) => {
          setIsLoading(false);

          setTeacherData(data[0]);
        })
        .catch((reason) => {
          setIsLoading(false);
        });
    }
  }, [teacher_id]);

  return (
    <div style={{ height: "100vh" }}>
      <Toast ref={toast} position={"top-center"} />
      <Navbar />
      <Spinner props={{ isLoading }} />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/upp.gif"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Επεξεργασία Εκπαιδευτικού
            </h2>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-3">
                <label htmlFor="name" className="sr-only">
                  Ονοματεπώνυμο
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={teacherData && teacherData.name}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ονοματεπώνυμο"
                  onChange={(e) => {
                    setTeacherData((prevState) => ({
                      ...prevState,
                      name: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="specialty" className="sr-only">
                  Ειδικότητα
                </label>
                <input
                  id="specialty"
                  name="specialty"
                  type="text"
                  value={teacherData && teacherData.specialty}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Ειδικότητα"
                  onChange={(e) => {
                    setTeacherData((prevState) => ({
                      ...prevState,
                      specialty: e.target.value,
                    }));
                  }}
                />
              </div>

              <div className="mb-3 text-center" style={{ marginTop: "15px" }}>
                <span class="text-gray-700 m-auto underline">Φύλο</span>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="gender"
                      id="answer1"
                      onChange={() => {
                        setTeacherData((prevState) => ({
                          ...prevState,
                          gender: "male",
                        }));
                      }}
                    />
                    <span class="ml-2">Ανδρας</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      class="form-radio"
                      name="gender"
                      id="answer2"
                      onChange={() => {
                        setTeacherData((prevState) => ({
                          ...prevState,
                          gender: "female",
                        }));
                      }}
                    />
                    <span class="ml-2">Γυναίκα</span>
                  </label>
                </div>
              </div>
              <div className="mb-3 text-center" style={{ marginTop: "10px" }}>
                <span class="text-gray-700 mt-10 underline">
                  Διευθυντής/ρια - Υποδιευθυντής/ρια
                </span>
                <div class="mt-2">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      class="form-radio"
                      name="headmaster"
                      id="answer3"
                      onChange={() => {
                        setTeacherData((prevState) => ({
                          ...prevState,
                          headmaster: 1,
                          subheadmaster: 0,
                        }));
                      }}
                    />
                    <span class="ml-2">Διευθυντής/Διευθύντρια</span>
                  </label>
                  <label class="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      class="form-radio"
                      name="headmaster"
                      id="answer4"
                      onChange={() => {
                        setTeacherData((prevState) => ({
                          ...prevState,
                          headmaster: 0,
                          subheadmaster: 1,
                        }));
                      }}
                    />
                    <span class="ml-2">Υποδιευθυντής/Υποδιευθύντρια</span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                onClick={onSubmit}
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Δημιουργία
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
