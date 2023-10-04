// holds all the information for the employees 

import { useEffect, useState } from "react"
import { User } from "../../users/User"
import "./Employees.css"
import { getStaffUsers } from "../../services/userServices"
import { Link } from "react-router-dom"


export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        getStaffUsers().then(employeesArray => {
            setEmployees(employeesArray)
        })
    }, [])

    return (
        <div className="employees">
            {employees.map((employeeObj) => {
                return (
                    //pass user prop 
                    <Link to={`/employees/${employeeObj.id}`} key={employeeObj.id}>
                    <User user={employeeObj}  />
                </Link>
                )
            })}
        </div>
    )
}