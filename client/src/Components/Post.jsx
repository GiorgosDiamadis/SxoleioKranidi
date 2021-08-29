import Footer from "./Footer";
import Navbar from "./Navbar";
import moment from "moment";
import {Link, useParams} from "react-router-dom";
import React, {useState, useEffect, useRef} from "react";
import PostRequest from "../PostRequest";
import {Toast} from "primereact/toast";
import {useHistory} from "react-router";
import Spinner from "./Spinner";


export default function Post() {
    const [postId, setPostId] = useState(useParams().post_id);
    const [isLoading,setIsloading] = useState(false)
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
            setIsloading(true);
            PostRequest("/posts/get", {post_id: postId})
                .then(({data}) => {
                    if(data.length === 0){
                        history.push("/")
                    }
                    setPost(data[0]);
                    setIsloading(false);

                })
                .catch((reason) => {
                    console.log(reason)
                });
        }
    }, [postId]);
    return (

        <div className={"flex flex-col h-screen justify-between"}>
            <Navbar/>
            <Toast ref={toast} position={"top-center"}/>
            <Spinner props={{isLoading}}/>

            {post && (
                <main

                    className="max-w-6xl mx-auto mt-32 space-y-6">
                    <div
                        // data-aos={"fade"}
                        className={"m-auto text-center"}>
                        <Link to={"/posts"}>
                            <button
                                className="h-10 px-5 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
                                Ολες οι ανακοινώσεις
                            </button>
                        </Link>
                    </div>


                    <article

                        data-aos={"fade-down"}
                            className="md:hidden w-full mx-auto p-3"
                    >
                        <div


                            className="float-left mr-2 w-36 h-36 sm:w-44 sm:h-44 col-span-4 text-center pt-14 mb-10">
                            <div  dangerouslySetInnerHTML={{__html: post.imgURL}}
                                 className={"rounded-xl"}>
                            </div>

                            <p className="block text-gray-400 text-xs">
                                Δημοσιεύτηκε στις <time>{moment(post.publishedAt).format("DD-MM-YYYY")}</time>
                            </p>
                            <div  className="flex items-center justify-center text-sm">
                                <img src="/upp.gif" className={"w-8 h-8"} alt="Lary avatar"/>
                                <div className="ml-3 text-left">
                                    <h5 className="font-bold text-xs">Διεύθυνση Σχολείου</h5>
                                </div>
                            </div>
                        </div>


                        <div className="col-span-8 pl-3 pt-12">
                            <h1 className="font-bold text-xl  mb-6">
                                {post.title}
                            </h1>

                            <div

                                className="space-y-4 text-lg leading-loose"
                                style={{overflowWrap: "anywhere"}}
                                dangerouslySetInnerHTML={{__html: post.body}}
                            >

                            </div>
                        </div>
                    </article>
                    <article

                        data-aos={"zoom-in"}
                        className={"hidden md:flex w-full flex-row"}>
                        <div className="w-96 h-96 text-center pt-14 mb-10">
                            <div dangerouslySetInnerHTML={{__html: post.imgURL}}
                                 className={"rounded-xl"}>
                            </div>

                            <p  className="mt-4 block text-gray-400 text-xs">
                                Δημοσιεύτηκε στις <time>{moment(post.publishedAt).format("DD-MM-YYYY")}</time>
                            </p>
                            <div  className="flex items-center justify-center text-sm mt-4">
                                <img src="/upp.gif" className={"w-10 h-10"} alt="Lary avatar"/>
                                <div className="ml-3 text-left">
                                    <h5 className="font-bold">Διεύθυνση Σχολείου</h5>
                                </div>
                            </div>
                        </div>

                         <div className="pl-3 pt-12">
                            <h1 className="font-bold text-4xl mb-6">
                                {post.title}
                            </h1>
                            <hr/>
                            <div

                                className="text-lg leading-loose"

                                style={{width:"800px"}}
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
