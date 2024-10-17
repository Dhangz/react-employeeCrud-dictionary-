import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';


function Customer() {

    const { id } = useParams();

    const [customer, setCustomer ] = useState("");
    const [notFound, setNotFound ] = useState(false);

    const url = "http://127.0.0.1:8000/api/customers/" + id;

    useEffect(() => {
        fetch(url)
        .then((response) => {

            if (response.status == 404){
                setNotFound(true)
            }
        
            return response.json()
        })
        .then((data) => setCustomer(data.customer))
    }, [url]);

    if (notFound) {
        return <>
        <p>Customer Does Not Exist</p>
        <Link to={'/Customers'}>Go back</Link>
        </>
    }

    return (
        <>  
            <p>{customer.id}</p>
            <p>{customer.name}</p>
            <p>{customer.industry}</p>

            <Link to={'/Customers'}>Go back</Link>
        </>
    )
    }

export default Customer