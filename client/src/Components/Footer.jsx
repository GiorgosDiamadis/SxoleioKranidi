import React, {useRef, useState} from "react";
import PostRequest from "../PostRequest";
import {Toast} from "primereact/toast";

export default function Footer() {
    const [email, setEmail] = useState("")
    const toast = useRef(null);
    return (
        <footer className="bg-gray-200 border border-black border-opacity-5 rounded-xl text-center py-5 px-10 mt-8">
            <Toast ref={toast} position={"top-center"}/>
            <div className="relative inline-block mx-auto bg-gray-200 rounded-full">
                <p>Website created by Diamadis Georgios &copy; 2021</p>
            </div>
        </footer>
    );
}
