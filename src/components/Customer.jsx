import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';

import { useContext } from "react";
import { LoginContext } from '../App'
import { baseUrl } from "../Shared";

function Customer() {

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);
    const [customer, setCustomer] = useState("");
    const [tempCustomer, setTempCustomer] = useState({ name: "", industry: "" });
    const [changed, setChanged] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState("");


    const url =  baseUrl + "api/customers/" + id;

    useEffect(() => {

        let equal = true;
        if (customer.name !== tempCustomer.name) equal = false;
        if (customer.industry !== tempCustomer.industry) equal = false;

        if (equal) {
            setChanged(false)
        }

    }, [customer, tempCustomer]);

    useEffect(() => {
        fetch(url, {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
        })
            .then((response) => {

                if (response.status === 401){
                    setIsLoggedIn(false);
                    navigate('/login', {
                        state : {
                            previousUrl : location.pathname
                        }
                    });
                }

                if (response.status == 404) {
                    setNotFound(true)
                }

                return response.json()
            })
            .then((data) => {
                setCustomer(data.customer)
                setTempCustomer(data.customer)
            })
    }, []);


    function validateCustomer() {
        // Check if both fields are filled
        if (!tempCustomer.name.trim() || !tempCustomer.industry.trim()) {
            setError("Both name and industry are required.");
            return false;
        }
        setError(""); // Clear any previous error
        return true;
    }


    function updateCustomer() {

        if (!validateCustomer()) return;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access')
            },
            body: JSON.stringify(tempCustomer)
        })
            .then((response) => {
                if (response.status === 401){
                    setIsLoggedIn(false);
                    navigate('/login', {
                        state : {
                            previousUrl : location.pathname
                        }
                    });
                }

                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json()
            }).then((data) => {
                setCustomer(data.customer)
                setChanged(false);
            }).catch((e) => console.log(e))
    }

    if (notFound) {
        return <>
            <p>Customer {id} Does Not Exist</p>
            <Link to={'/Customers'}>Go back</Link>
        </>
    }

    return (
        <>  

        
            <div className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Name
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Product Name' value={tempCustomer.name}
                            onChange={(e) => {
                                setTempCustomer({ ...tempCustomer, name: e.target.value })
                                setChanged(true)
                            }} />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Industry
                        </label>
                    </div>
                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Product Name' value={tempCustomer.industry}
                            onChange={(e) => {
                                setTempCustomer({ ...tempCustomer, industry: e.target.value })
                                setChanged(true);
                            }} />
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

            {changed ? (
                <>
                    <button className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded m-1' onClick={() => {
                        setTempCustomer({ ...customer })
                        setChanged(false)
                    }

                    }>Cancel</button>
                    <button className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded m-1' onClick={updateCustomer}>Save</button>
                </>) : null}
            <br />

            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 m-1 px-4 rounded'  onClick={() => {
                fetch("http://127.0.0.1:8000/api/customers/" + id, {
                    method: "DELETE", 
                    headers: {
                        'Content-Type' : 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('access')
                    },
                }).then((response) => {
                    if (response.status === 401){
                        setIsLoggedIn(false);
                        navigate('/login', {
                            state : {
                                previousUrl : location.pathname
                            }
                        });
                    }

                    if (!response.ok) {
                        throw new Error('Something went wrong');
                    }
                    navigate('/Customers')

                }).catch((e) => console.log(e))
            }}>Delete</button> <br /> <br />

            <Link  to={'/Customers'}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded'>Go back</button>
            </Link>
        </>
    )
}

export default Customer