import { useState } from "react"
import Employee from "../components/Employee"
import AddEmployee from "../components/AddEmployee";
import { v4 as uuidv4 } from 'uuid';
import EditEmployee from "../components/EditEmployee";



function EmployeeList() {

    const [employees, setEmployees] = useState([
        {
        id: 1,
        name: "Luffy",  
        role: "Captain", 
        img: "https://i.pinimg.com/originals/43/8f/3a/438f3a83bbc287843af4470834384d59.jpg"
        },
        {
        id: 2,
        name: "Ussop",  role: "Sniper", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Ussop-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 3,
        name: "jimbei",  role: "Ewan", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Jinbe-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 4,
        name: "Franky",  role: "Ship Wright", img: "https://wallpaperaccess.com/full/1577243.jpg"
        },
        {
        id: 5,
        name: "Brook",  role: "Singer", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Brook-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 6,
        name: "Robin",  role: "Archeologist", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Robin-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 7,
        name: "Nami",  role: "Navigator", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Nami-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 8,
        name: "Zoro",  role: "Vice Captain", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Roronoa-Zoro-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 9,
        name: "Sanji",  role: "Cook", img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/Sanji-of-One-Piece.jpg?q=50&fit=crop&w=750&dpr=1.5"
        },
        {
        id: 10,
        name: "Chopper",  role: "Doctor", img: "https://tse4.mm.bing.net/th?id=OIP.4_tUcm9PrbatIUu7V1tLaAHaHa&pid=Api&P=0&h=220"
        }
        
    ]);

    function addNewCrew(name, role, img){

    
        const newCrew = {
        id: uuidv4(),
        name: name,
        role: role,
        img: img
        }
        setEmployees([...employees, newCrew])

    }

    function updateCrew(CurrentId, newName, newRole){

    const updatedCrew = employees.map((employee) => {
        if(employee.id === CurrentId) {
        return {...employee, name: newName, role: newRole}
        } else {
        return employee
        }
        
    })

    setEmployees(updatedCrew)
    }

    function handleDeleteCrew(CurrentId){

    const remainingCrew = employees.filter((element) => {
        return element.id !== CurrentId
        })

    setEmployees(remainingCrew)

    }

    

    return (
        <>
        { employees.length > 0 ? (
            <>
                <div className="mx-auto max-w-7xl flex flex-wrap align-center justify-center my-3 ">
                {
                employees.map((element) => {
        
                    return < Employee 
                            key={element.id} 
                            id={element.id} 
                            name={element.name} 
                            role={element.role} 
                            img={element.img} 
                            updateCrew={updateCrew}
                            handleDeleteCrew={handleDeleteCrew}
                            editCrew={<EditEmployee id={element.id} key={element.index}  name={element.name} role={element.role} updateCrew={updateCrew} />}                       
                        />         
                })
                } 
                </div>
                
                <AddEmployee addNewCrew={addNewCrew} />
            </>
        ) : <h6 className="text-center">No Record to Show</h6>}      
        </>
        
    )
}

export default EmployeeList
