import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getEmployeesByUserId } from "../../services/employeeServices"
import "./Employees.css"

export const EmployeeDetails = () => {

    const [employee, setEmployee] = useState({})
    const { employeeId } = useParams()

    useEffect(() => {
        getEmployeesByUserId(employeeId).then((data) => {
            const employeeObj = data[0]
            if(employeeObj) {

                setEmployee(employeeObj)
            }
        })

    }, [employeeId])

    
   
    



    return <section className="employee">
        
        
        <header className="employee-header">{employee.user?.fullName}</header>
        <div>
            <span className="employee-info"> Email : </span>
            {employee.user?.email}
        </div>
        <div>
            <span className="employee-info"> Specialty: </span>
            {employee.specialty}
        </div>
        <div>
            <span className="employee-info"> Rate : </span>
            {employee.rate}
        </div>
        
        <div>
           <footer className="employee-footer">

            Currently Working On {employee.employeeTickets?.length} tickets
           </footer>
            
        </div>


    </section>
    
}