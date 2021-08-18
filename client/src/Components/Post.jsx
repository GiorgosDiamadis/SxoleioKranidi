import Footer from "./Footer";
import Navbar from "./Navbar";
import moment from "moment";
import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {postRequest} from "../RequestController";

export default function Post() {
    const [postId, setPostId] = useState(useParams().post_id);
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (postId !== -1) {
            console.log(postId);
            postRequest("/posts/get", {post_id: postId})
                .then(({data}) => {
                    setPost(data[0]);
                    console.log(data)
                })
                .catch((reason) => {
                    console.log(reason);
                });
        }
    }, [postId]);
    return (
        <div className={"flex flex-col h-screen justify-between"}>
            <Navbar/>
            {post && (
                <main className="max-w-6xl mx-auto mt-32 lg:mt-32 space-y-6">
                    <article className="max-w-4xl mx-auto lg:grid lg:grid-cols-12 gap-x-10">
                        <div className="col-span-4 lg:text-center lg:pt-14 mb-10">
                            <div data-aos={"zoom-out"} dangerouslySetInnerHTML={{__html: post.imgURL}}
                                 className={"rounded-xl"}>

                            </div>

                            <p data-aos={"zoom-out"} className="mt-4 block text-gray-400 text-xs">
                                Δημοσιεύτηκε στις  <time>{moment(post.publishedAt).format("DD-MM-YYYY")}</time>
                            </p>

                            <div data-aos={"zoom-out"} className="flex items-center lg:justify-center text-sm mt-4">
                                <img src="/upp.gif" className={"w-10 h-10"} alt="Lary avatar"/>
                                <div className="ml-3 text-left">
                                    <h5 className="font-bold">Διεύθυνση Σχολείου</h5>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-8">
                            <div data-aos={"zoom-out"} className="hidden lg:flex justify-between mb-6">
                                <Link to={"/posts"}>
                                    <button
                                        className="h-10 px-5 transition-colors duration-150 border border-blue-400 rounded-lg focus:shadow-outline hover:bg-blue-400 hover:text-gray-100">
                                        Πίσω στις ανακοινώσεις
                                    </button>
                                </Link>
                            </div>

                            <h1 data-aos={"zoom-out"} className="font-bold text-3xl lg:text-4xl mb-10">
                                {post.title}
                            </h1>

                            <div
                                data-aos={"zoom-out"}
                                className="space-y-4 lg:text-lg leading-loose"
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
