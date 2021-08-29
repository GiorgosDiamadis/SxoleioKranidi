import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-200 border border-black border-opacity-5 rounded-xl text-center py-16 px-10 mt-16">
            <img src="./images/lary-newsletter-icon.svg" alt="" className="mx-auto -mb-6" style={{width: "145px"}}/>
                <h5 className="text-3xl">Ενημερωθείτε για κάθε νέα ανακοίνωση</h5>
                <div className="mt-10">
                    <div className="relative inline-block mx-auto bg-gray-200 rounded-full">

                        <form method="POST" action="#" className="lg:flex text-sm">
                            <div className="py-3 px-5 bg-gray-300 rounded-2xl flex items-center">
                                <label htmlFor="email" className="hidden inline-block">
                                    <i className="fas fa-envelope text-3xl"></i>
                                </label>

                                <input id="email" type="text" placeholder="Email"
                                       className="bg-transparent py-2 py-0 pl-4 focus-within:outline-none"/>
                            </div>

                            <button
                                    className="transition-colors duration-300 bg-blue-400 hover:bg-blue-500 mt-4 mt-0 ml-3 rounded-full text-xs font-semibold text-white uppercase py-3 px-8"
                            >
                                Εγγραφη
                            </button>
                        </form>
                        <p className={"mt-8"}>Website created by Diamadis Georgios &copy; 2021</p>
                    </div>
                </div>
        </footer>
    );
}
