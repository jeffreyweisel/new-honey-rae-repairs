//holds all the information for the customers 

import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userServices"
import "./Customers.css"
import { User } from "../../users/User"
import { Link } from "react-router-dom"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getNonStaffUsers().then(customersArray => {
            setCustomers(customersArray)
        })
    }, [])

    return (
        <div className="customers">
            {customers.map((customerObj) => {
                //pass user prop
                return (
                <Link to={`/customers/${customerObj.id}`} key={customerObj.id}>
                    <User user={customerObj}  />
                    </Link>
                )
            })}

        </div>
    )
}