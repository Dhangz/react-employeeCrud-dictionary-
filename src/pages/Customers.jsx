import { useState, useEffect } from "react"
import { Link} from 'react-router-dom'
import AddCustomer from '../components/AddCustomer';

function Customers() {

    const [customers, setCustomers] = useState([]);
    const [show, setShow] = useState(false);
    
    const url = "http://127.0.0.1:8000/api/customers";

    useEffect(() => {
        fetch(url)
        .then((response) =>  {
            if (!response.ok){
                throw new Error('Something went wrong');
            }

            return response.json()
        })
        .then((data) => {      
            setCustomers(data.customers)
            
        }).catch((e) => console.log(e))
    }, []);

    function toggleShow(){
        setShow(!show)
    }

   // const toggleShow = () => setShow(!show);


    function addNewCustomer(name, industry){

        const data = { name: name, industry: industry}
        fetch('http://127.0.0.1:8000/api/customers/', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        })
        .then((response) => {
            if (!response.ok){
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
            {   customers.map((customer) => {
                    return <ul className="border" key={customer.id}>
                        <li><Link to={'/Customers/' + customer.id}>{customer.name}</Link></li>
                    </ul>
                })
            }
            <AddCustomer addNewCustomer={addNewCustomer} show={show} toggleShow={toggleShow}/>
        </>
    )
    }


export default Customers