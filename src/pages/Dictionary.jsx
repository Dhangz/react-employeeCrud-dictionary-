import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Dictionary() {

    const [word, setWord] = useState("");
    const navigate = useNavigate();

    return (
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    <form className="mt-5 sm:flex sm:items-center" onSubmit={(e) => {
                    e.preventDefault();
                    navigate('/Definitions/' + word)
                }}>
                        <input id="q" name="q" className="inline mt-3 w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm" placeholder="Keyword" type="search" autoFocus="" onChange={(e) => setWord(e.target.value)}
                        value={word} />
                        <button type="submit" className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Search</button>
                    </form>
                </div>
            </div>
            )
}
export default Dictionary