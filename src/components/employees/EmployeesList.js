// holds all the information for the employees 

import { useEffect, useState } from "react"
import { User } from "../../users/User"
import "./Employees.css"
import { getStaffUsers } from "../../services/userServices"

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
                    <User user={employeeObj} key={employeeObj.id} />
                )
            })}
        </div>
    )
}