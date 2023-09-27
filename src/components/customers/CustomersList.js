//holds all the information for the customers 

import { useEffect, useState } from "react"
import { getNonStaffUsers } from "../../services/userServices"
import "./Customers.css"
import { User } from "../../users/User"

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
                return (<User user={customerObj} key={customerObj.id} />
                )
            })}

        </div>
    )
}