import { useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../App";
import { baseUrl } from "../Shared";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const location = useLocation();
    const navigate = useNavigate();
    const [ isLoggedIn, setIsLoggedIn ] = useContext(LoginContext);

    function login(){
        const url = baseUrl + "api/token/"

        fetch(url, {
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
                username : username,
                password : password
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Something went wrong');
            }

            return response.json();
        })
        .then((data) => {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            setIsLoggedIn(true)
            navigate(location?.state?.previousUrl ? location.state.previousUrl : '/')
        })
        .catch((e) => console.log(e))
    }

    return (
        <>
            <form  name='login' id='login' className="w-full max-w-sm" onSubmit={(e) => {
                e.preventDefault();
                login();
            }
                }>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
                            Username
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="username" type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
                            Password
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    
                    <div className="md:flex md:items-center mb-6 justify-end">
                    <button form='login' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' type="submit">Login</button>
                    </div>
                    
                    
                    
                </form>
        </>
    )
}

