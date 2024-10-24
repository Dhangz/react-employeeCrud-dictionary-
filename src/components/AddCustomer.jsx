import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types'

export default function AddCustomer(props) {

    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");
    
    const [show, setShow] = useState(props.show);

    return (
        <>

        <button form='editModal' className='mx-auto block bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded' type="button" onClick={props.toggleShow}>+ Add Customer</button>


        <Modal show={props.show} onHide={props.toggleShow}>
            <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={
                        (e) => {
                            e.preventDefault();                                
                            props.addNewCustomer(name, industry);
                            setName("");
                            setIndustry("");
                        }
                        } name='editModal' id='editModal' className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Name
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-role">
                            Industry
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-role" type="text" placeholder='Role' value={industry} onChange={(e) => setIndustry(e.target.value)} />
                        </div>
                    </div>
                    
                    
                </form>
            </Modal.Body>
            <Modal.Footer>
                
            <button onClick={props.toggleShow} className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'  >Close</button>

            <button form='editModal' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' type="submit">Add</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

AddCustomer.propTypes = {
    
    name: PropTypes.string,
    industry: PropTypes.string,
    addNewCustomer: PropTypes.func,
    toggleShow: PropTypes.func,
    show: PropTypes.bool,
}
