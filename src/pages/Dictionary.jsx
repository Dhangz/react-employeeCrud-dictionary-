import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Dictionary() {

    const [word, setWord] = useState("");
    const navigate =  useNavigate();
    
    return (


        <form className="mx-auto" onSubmit={(e) => {
            e.preventDefault();
            navigate('/Definitions/' + word)
        }}>
            <label className="mx-auto block">
                <span className="block text-sm font-medium text-slate-700">Dictionary</span>
                <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                invalid:border-pink-500 invalid:text-pink-600
                focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                " onChange={(e) => setWord(e.target.value)}
                value={word}/>
                <p className="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
                Please provide a valid email address.
                </p>
            </label>

            <button className='mx-auto block bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded' type="submit">Search</button>
            </form>

        // <form className="px-2" onSubmit={() => {
        //     navigate('/Definitions/' + word)
        // }}>
        //     <h1>Dictionary</h1>
        //     {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        //     <div className="sm:col-span-4">
        //         <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        //         <div className="mt-2">
        //             <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
        //             <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">Search/</span>
        //             <input type="text" name="username" id="username" autoComplete="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Search..." value={word} onChange={(e) => setWord(e.target.value)} />
        //             </div>
        //         </div>
        //     </div>
        //     </div> */}

        //     <label className="mx-auto">
        //         <span className="block text-sm font-medium text-slate-700">Username</span>
                
        //         <input type="text" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        //         focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        //         disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
        //         invalid:border-pink-500 invalid:text-pink-600
        //         focus:invalid:border-pink-500 focus:invalid:ring-pink-500
        //         onChange={(e) => setWord(e.target.value)}
        //         value={word}
        //         "/>
        //     </label>

        //     {/* <input   className="bg-gray-200" onChange={(e) => setWord(e.target.value)} /> */}

        //     <button type="submit">Search</button>
        
        // </form>
    )
}
export default Dictionary