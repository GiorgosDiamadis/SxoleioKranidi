import Navbar from "../Components/Navbar";
import {Toast} from "primereact/toast";
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {Editor, EditorProps} from "primereact/editor";
import {Button} from "primereact/button";
import React, {useEffect, Fragment, useRef, useState} from "react";
import {postRequest} from "../RequestController";
import {FileUpload} from "primereact/fileupload";
import axios from "axios";

export default function CreatePost() {
    const toast = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [postData, setPostData] = useState({
        title: "",
        body: "",
        summary: "",
        image: ""
    });


    const handleOnClick = () => {
        setIsLoading(true);

        var data = new FormData();
        data.append('file', postData.image);


        postRequest("/posts/create", data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setIsLoading(false);
                console.log(response.data)
            })
            .catch((res) => {
                setIsLoading(false);
                setErrors(res.response.data.errors);
            });
    };

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
    }

    const header = renderHeader();

    const [file, setFile] = useState('');


    const onChange = e => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append("title","ηασδθιασδβηνθαξσδιγθαισ")

        formData.append("body","ηασδθιασδβηνθαξσδιγθαισ")
        formData.append("summary","ηασδθιασδβηνθαξσδιγθαισ")
        try {
            const res = await axios.post('http://localhost:8080/posts/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            console.log(res.data)

        } catch (err) {
        }
    };

    return (
        <div>
            <div
                className="p-d-flex p-flex-row p-jc-center p-ai-center"
                style={{height: "100vh"}}
            >
                <Toast ref={toast} position={"top-center"}/>

                <Card title="Νέα Ανακοίνωση" id="newPost">
                    <div className="p-d-flex p-flex-column p-jc-center p-ai-center">
                        <div className=''>
                            <input
                                type='file'
                                className='custom-file-input'
                                id='customFile'
                                onChange={onChange}
                            />
                        </div>
                        <input
                            type='submit'
                            value='Upload'
                            className='btn btn-primary btn-block mt-4'
                        />

                        <div className="p-inputgroup p-mb-2 ">
                          <span className="p-float-label">
                            <InputText

                                id="title"
                                tooltip="Εισάγετε τον τίτλο της δημοσίευσης"
                                tooltipOptions={{position: "top"}}
                                aria-describedby="title-help"
                                onChange={(e) => {
                                    setPostData((prevState) => ({
                                        ...prevState,
                                        title: e.target.value,
                                    }));
                                }}
                            />
                            <label htmlFor="title">Τίτλος</label>
                          </span>
                        </div>
                        <div className="p-inputgroup p-mb-2 ">
                          <span className="p-float-label">
                            <InputText
                                id="summary"
                                tooltip="Εισάγετε την περίληψη της δημοσίευσης"
                                tooltipOptions={{position: "top"}}
                                aria-describedby="summary-help"
                                onChange={(e) => {
                                    setPostData((prevState) => ({
                                        ...prevState,
                                        summary: e.target.value,
                                    }));
                                }}
                            />
                            <label htmlFor="summary">Περίληψη</label>
                          </span>
                        </div>


                        <div className="p-inputgroup">
                            <Editor
                                style={{width: "800px"}}
                                headerTemplate={header}
                                value={postData.body}
                                onTextChange={(e) => {
                                    setPostData((prevState) => ({
                                        ...prevState,
                                        body: e.htmlValue,
                                    }));
                                    console.log(postData)
                                }}
                            />
                        </div>

                        <Button
                            label="Δημιουργία"
                            loading={isLoading}
                            className="p-mt-6"
                            onClick={onSubmit}
                        />
                    </div>
                </Card>
            </div>

        </div>
    );
}
