import PropTypes from 'prop-types'

import DeleteEmployee from './DeleteEmployee';


function Employee(props) {

    

    return (
        <div className="relative min-w-[300px] max-w-[300px] m-2 py-8 px-8 bg-white rounded-xl shadow-xl space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">

    {/* Close Button */}
    
    
    <DeleteEmployee handleDeleteCrew={props.handleDeleteCrew} id={props.id} name={props.name} />

    <img className="object-cover h-[100px] w-[100px] block mx-auto rounded-full sm:mx-0 sm:shrink-0" src={props.img ? props.img : "https://tse4.mm.bing.net/th?id=OIP.g6sTdGfbyN2DffeFBszqqQAAAA&pid=Api&P=0&h=220"} />
    <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
            <p className="text-lg text-black font-semibold text-ellipsis overflow-hidden ...">
                {props.name}
            </p>
            <p className="text-slate-500 font-medium">
                {props.role}
            </p>
        </div>

        {props.editCrew}
        {/* <EditEmployee id={props.id} key={props.id} name={props.name} role={props.role} updateCrew={props.updateCrew} /> */}
    </div>
</div>

    )
}

Employee.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    role: PropTypes.string,
    updateCrew: PropTypes.func,
    handleDeleteCrew: PropTypes.func,
    editCrew: PropTypes.object

}




export default Employee