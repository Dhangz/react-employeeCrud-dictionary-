import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AddCustomer from '../components/AddCustomer';
import { useContext } from "react";
import { LoginContext } from '../App'
import { baseUrl } from '../Shared'

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const location = useLocation();
    const navigate = useNavigate();

    const url = baseUrl + 'api/customers/';

    useEffect(() => {
        fetch(url, {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem('access'),
            }
        })
            .then((response) => {

                if (response.status === 401) {
                    setIsLoggedIn(false);
                    navigate('/login', {
                        state : {
                            previousUrl : location.pathname
                        }
                    });
                }
                return response.json()
            })
            .then((data) => {
                setCustomers(data.customers)

            })
    }, []);

    function toggleShow() {
        setShow(!show)
    }

    // const toggleShow = () => setShow(!show);


    function addNewCustomer(name, industry) {

        const data = { name: name, industry: industry }
        fetch('http://127.0.0.1:8000/api/customers/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access') 
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Something went wrong');
                }
                return response.json()

            }).then((data) => {
                toggleShow();
                setCustomers([...customers, data.customers]);
            })
            .catch((e) => console.log(e))
    }

    return (
        <>  
            <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2 p-4">   
                            
                    {customers.map((customer) => {
                        return <div className="p-2 sm:w-1/2 w-full " key={customer.id}>
                                <Link to={'/Customers/' + customer.id} className="bg-gray-100 rounded flex p-1 h-full items-center shadow no-underline">
                            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"
                                    className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                                    <path d="M22 4L12 14.01l-3-3"></path>
                                </svg>
                                <span className="font-medium  ">{customer.name}</span>
                            </div>
                            </Link>
                        </div>
                    })
                    }
            </div>

            < AddCustomer show={show} addNewCustomer={addNewCustomer} toggleShow={toggleShow} />
        </>

    )
}


export default Customers