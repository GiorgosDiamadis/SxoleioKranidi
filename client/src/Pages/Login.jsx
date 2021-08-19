import React, {useContext, useEffect, useRef, useState} from "react";
import {Toast} from "primereact/toast";

import {useHistory} from "react-router-dom";
import {AuthContext} from "../useAuth";
import Navbar from "../Components/Navbar";
import Spinner from "../Components/Spinner";
import PostRequest from "../PostRequest";



export default function Login(props) {
    const [loginData, setLoginData] = useState({username: "", password: ""});
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (errors && errors.length > 0) {
            showError(errors);
        }
    }, [errors]);
    const toast = useRef(null);
    let history = useHistory();
    const auth = useContext(AuthContext);

    const handleOnClick = (e) => {
        e.preventDefault()
        setIsLoading(true);
        PostRequest("user/login", {...loginData})
            .then((response) => {
                setIsLoading(false);
                auth.login(
                    {
                        ...response.data.user,
                    },
                    response.headers.authorization
                );
                console.log(response)
                history.push("/");
            })
            .catch((res) => {
                setIsLoading(false);
                setErrors(res.response.data.errors);
            });
    };

    const showError = (errors) => {
        var errorMessage = "";
        errors.forEach((error) => {
            errorMessage += error.msg + " ";
        });
        toast.current.show({
            severity: "error",
            summary: "Αποτυχία σύνδεσης",
            detail: errorMessage,
            sticky: true,
        });
    };

    return (
        <div
            style={{height: "100vh"}}
        >
            <Navbar/>
            <Toast ref={toast} position={"top-center"}/>
            <Spinner props={{isLoading}}/>

            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="/upp.gif"
                             alt="Workflow"/>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Σύνδεση διαχειριστή
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Ονομα χρήστη</label>
                                <input id="username" name="username" type="text"
                                       className="appearance-none mb-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Ονομα χρήστη"
                                       onChange={(e) => {
                                           setLoginData((prevState) => ({
                                               ...prevState,
                                               username: e.target.value,
                                           }));
                                       }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Κωδικός πρόσβασης</label>
                                <input id="password" name="password" type="password"
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Κωδικός πρόσβαση"
                                       onChange={(e) => {
                                           setLoginData((prevState) => ({
                                               ...prevState,
                                               password: e.target.value,
                                           }));
                                       }}
                                />
                            </div>
                        </div>
                        <div>
                            <button type="submit"
                                    onClick={handleOnClick}
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
						<span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                               aria-hidden="true">
								<path fill-rule="evenodd"
                                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                      clip-rule="evenodd"/>
							</svg>

						</span>

                                Σύνδεση
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
