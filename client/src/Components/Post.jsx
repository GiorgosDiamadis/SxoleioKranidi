import Footer from "./Footer";
import Navbar from "./Navbar";
import moment from "moment";
import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import PostRequest from "../PostRequest";
import {Toast} from "primereact/toast";
import {useHistory} from "react-router";


export default function Post() {
    const [postId, setPostId] = useState(useParams().post_id);
    const [post, setPost] = useState(null);
    const toast = useRef(null);
    const history = useHistory();

    useEffect(() => {
        if (postId !== -1) {
            if (history.location.state && history.location.state.post) {
                toast.current.show({
                    severity: "success",
                    summary: "Επιτυχής δημιουργία ανακοίνωσης",
                    sticky: false,
                });
                history.replace({
                    pathname: history.location.pathname,
                    state: {}
                });
            }else if(history.location.state && history.location.state.update){
                toast.current.show({
                    severity: "success",
                    summary: "Επιτυχής επεξεργασία ανακοίνωσης",
                    sticky: false,
                });
                history.replace({
                    pathname: history.location.pathname,
                    state: {}
                });
            }
            PostRequest("/posts/get", {post_id: postId})
                .then(({data}) => {
                    setPost(data[0]);

                })
                .catch((reason) => {

                });
        }
    }, [postId]);
    return (

        <div className={"flex flex-col h-screen justify-between"}>
            <Navbar/>
            <Toast ref={toast} position={"top-center"}/>
            {post && (
                <main className="max-w-6xl mx-auto mt-32 mt-32 space-y-6">
                    <div className="fixed left-0 w-36 h-36 col-span-4 text-center pt-14 mb-10">
                        <div data-aos={"fade"}  dangerouslySetInnerHTML={{__html: post.imgURL}}
                             className={"rounded-xl"}>


                        </div>

                        <p data-aos={"fade"}  className="mt-4 block text-gray-400 text-xs">
                            Δημοσιεύτηκε στις <time>{moment(post.publishedAt).format("DD-MM-YYYY")}</time>
                        </p>

                        <div data-aos={"fade"}  className="flex items-center justify-center text-sm mt-4">
                            <img src="/upp.gif" className={"w-10 h-10"} alt="Lary avatar"/>
                            <div className="ml-3 text-left">
                                <h5 className="font-bold">Διεύθυνση Σχολείου</h5>
                            </div>
                        </div>
                    </div>

                    <article className="max-w-4xl pl-36 mx-auto p-3">

                        <div className="col-span-8 pl-3 pt-4">
                            <h1 data-aos={"fade"}  className="font-bold text-xl sm:text-4xl mb-6">
                                {post.title}
                            </h1>
                            <hr/>
                            <div
                                data-aos={"fade"}
                                className="space-y-4 text-lg leading-loose"
                                style={{overflowWrap: "anywhere"}}
                                dangerouslySetInnerHTML={{__html: post.body}}
                            >

                            </div>
                        </div>
                    </article>
                </main>
            )}

            <Footer/>
        </div>
    );
}
