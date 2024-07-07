import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types'

function AddEmployee(props) {

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [imgRole, setImgRole] = useState("");
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    
    return (
        <>

        <button form='editModal' className='mx-auto block bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded' type="button" onClick={handleShow}>+ Add Crew</button>


        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Add Crew</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={
                        (e) => {
                            e.preventDefault();                          
                            props.addNewCrew(name, role, imgRole);
                            setName("");
                            setRole("");
                            setImgRole("");
                        }
                        } name='editModal' id='editModal' className="w-full max-w-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Full Name
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder='Full Name' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-role">
                            Role
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-role" type="text" placeholder='Role' value={role} onChange={(e) => setRole(e.target.value)} />
                        </div>
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-imgRole">
                            Image URL
                        </label>
                        </div>
                        <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-imgRole" type="text" placeholder='Image URL' value={imgRole} onChange={(e) => setImgRole(e.target.value)} />
                        </div>
                    </div>
                    
                    
                </form>
            </Modal.Body>
            <Modal.Footer>
                
            <button onClick={handleClose} className='bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'  >Close</button>

            <button form='editModal' className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded' type="submit" onClick={handleClose}>Add</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

AddEmployee.propTypes = {
    
    name: PropTypes.string,
    role: PropTypes.string,
    img: PropTypes.string,
    addNewCrew: PropTypes.func
}



export default AddEmployee