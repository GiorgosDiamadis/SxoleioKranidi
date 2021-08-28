import {Link} from "react-router-dom";

export default function NotFound(){
    return <div className="bg-gradient-to-r from-blue-300 to-blue-500">
        <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
                <div className="border-t border-gray-200 text-center pt-16 px-16">
                    <h1 className="text-9xl font-bold text-blue-400">404</h1>
                    <h1 className="text-5xl font-medium py-8">Η σελίδα που ψάχνετε δεν υπάρχει!</h1>
        <Link to={"/"}>
            <button
                className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-md mr-6">
                Επιστροφή στην Αρχική σελίδα
            </button>
        </Link>

                </div>
            </div>
        </div>
    </div>
}