import { useState, useEffect } from "react"

function Customers() {

    const [customers, setCustomers] = useState([]);

    const url = "http://127.0.0.1:8000/api/customers";

    useEffect(() => {
        fetch(url)
        .then((response) => response.json())
        .then((data) => setCustomers(data.customers)
        )
    }, []);



    return (
        <>
        {
            customers.map((customer) => {
                return <ul className="border" key={customer.id}>
                    <li><strong>{customer.name}</strong></li>
                    <li>{customer.industry}</li>
                </ul>
            })
        }
        </>
    )
    }


export default Customers