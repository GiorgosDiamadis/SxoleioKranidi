import {Toast} from "primereact/toast";
import {Editor} from "primereact/editor";
import React, {useEffect, Fragment, useRef, useState} from "react";
import Navbar from "../Components/Navbar";

import axios from "axios";
import {useHistory} from "react-router-dom";
import Spinner from "../Components/Spinner";

export default function CreatePost() {
    const toast = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    let history = useHistory();

    const [postData, setPostData] = useState({
        title: "",
        body: "",
        summary: "",
    });
    const renderHeader = () => {
        return (
            <>
        <span className="ql-formats">
          <button className="ql-bold" aria-label="Bold"></button>
          <button className="ql-italic" aria-label="Italic"></button>
          <button className="ql-underline" aria-label="Underline"></button>
        </span>
                <select className="ql-size">
                    <option value="small"></option>
                    <option></option>
                    <option value="large"></option>
                    <option value="huge"></option>
                </select>
            </>
        );
    };

    const header = renderHeader();

    const [file, setFile] = useState("");
    const [fileURL, setFileURL] = useState("#");
    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileURL(URL.createObjectURL(e.target.files[0]));
    };

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
        const formData = new FormData();
        postData.body = postData.body.replaceAll("'", '"');
        formData.append("file", file);
        formData.append("title", postData.title);

        formData.append("body", postData.body);
        formData.append("summary", postData.summary);

        try {
            setIsLoading(true);
            const res = await axios.post(
                `http://localhost:8080/posts/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setIsLoading(false);
            console.log(res)
            history.push(`/posts/${res.data._id}`);
        } catch (err) {
            setIsLoading(false);
            setErrors(err.response.data.errors);
        }
    };

    return (
        <div style={{height: "100vh"}}>
            <Toast ref={toast} position={"top-center"}/>
            <Navbar/>
            <Spinner props={{isLoading}}/>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div data-aos={"zoom-out"} className="max-w-2xl w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="/upp.gif"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Νέα Ανακοίνωση
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" value="true"/>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div data-aos={"zoom-out"} className="mb-3">
                                <label htmlFor="title" className="sr-only">
                                    Τίτλος
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Τίτλος"
                                    onChange={(e) => {
                                        setPostData((prevState) => ({
                                            ...prevState,
                                            title: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div data-aos={"zoom-out"} className="mb-3">
                                <label htmlFor="summary" className="sr-only">
                                    Περίληψη
                                </label>
                                <input
                                    id="summary"
                                    name="summary"
                                    type="text"
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Περίληψη"
                                    onChange={(e) => {
                                        setPostData((prevState) => ({
                                            ...prevState,
                                            summary: e.target.value,
                                        }));
                                    }}
                                />
                            </div>
                            <div data-aos={"zoom-out"}>
                                <Editor
                                    className="mb-3 mt-3"
                                    headerTemplate={header}
                                    value={postData.body}
                                    onTextChange={(e) => {
                                        setPostData((prevState) => ({
                                            ...prevState,
                                            body: e.htmlValue,
                                        }));
                                    }}
                                />
                            </div>
                            <div data-aos={"zoom-out"} className="mb-3">
                                <div className="">
                                    <label
                                        className="w-64 flex m-auto flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-600">
                                        <svg
                                            className="w-8 h-8"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                                        </svg>
                                        <span className="mt-2 text-base leading-normal">
                      Επέλεξε εικόνα
                    </span>
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                            hidden
                                        />
                                        <img id="uploaded" src={fileURL}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div data-aos={"zoom-out"}>
                            <button
                                type="submit"
                                onClick={onSubmit}
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 disabled:bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Δημιουργία Ανακοίνωσης
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
