//holds all the ticket info and logic for the buttons

import { useEffect, useState } from "react"
import { getAllEmployees } from "../../services/employeeServices"
import { assignTicket, deleteTicket, updateTicket } from "../../services/ticketServices"
import { useNavigate } from "react-router-dom"

export const Ticket = ({ ticket, currentUser, getAndSetTickets }) => {

    const navigate = useNavigate()
    
    const [employees, setEmployees] = useState([])
    const [assignedEmployee, setAssignedEmployee] = useState({})


    useEffect(() => {
        getAllEmployees().then((employeeArray) => {
            setEmployees(employeeArray)
        })
    }, [])

    //tracks when employees state changed
    useEffect(() => {
        const foundEmployee = employees.find(
            (employee) => employee.id === ticket.employeeTickets[0]?.employeeId)
        setAssignedEmployee(foundEmployee)
    }, [employees, ticket])


    const handleCLaim = () => {
        const currentEmployee = employees.find((employee) => employee.userId === currentUser.id)
        const newEmployeeTicket = {
            employeeId: currentEmployee.id,
            serviceTicketId: ticket.id
        }
        assignTicket(newEmployeeTicket).then(() =>
            getAndSetTickets()
        )

    }

    const handleClose = () => {
        const closedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        updateTicket(closedTicket).then(() => {
            getAndSetTickets()
        })
    }


    const handleDelete = () => {
        deleteTicket(ticket.id).then(() => {
            getAndSetTickets()
        })
    }

    
    return (
        <section className="ticket">
            <header className="ticket-info">{ticket.id}</header>
            <div>{ticket.description}</div>
            <footer>
                <div>
                    <div className="ticket-info">assignee</div>
                    <div>{assignedEmployee ? assignedEmployee.user?.fullName : "None"}</div>
                </div>
                <div>
                    <div className="ticket-info">emergency</div>
                    <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
                <div className="btn-container">
                    {/* if logged in user is an employee and there is no employeeTicket associated with service ticket, then a button yto claim should diplay */}
                    {currentUser.isStaff && !assignedEmployee ? (<button
                        className="btn btn-secondary"
                        onClick={handleCLaim}
                    >Claim</button>) : ""
                    }
                    {/* if the logged in user is the assigned employee for the ticket and there is no datCompleted, thena  button  to close the ticket should display */}
                    {assignedEmployee?.userId === currentUser.id && !ticket.dateCompleted ?
                        (<button className="btn btn-warning"
                            onClick={handleClose}
                        >Close</button>) : ""}
                    {!currentUser.isStaff ?
                    (<button className="filter-btn btn-primary"
                        onClick={() => {
                            navigate("/tickets/edit/"+ ticket.id, {ticket})
                        }}
                    >Edit</button>) : ""}
                    {!currentUser.isStaff ?
                        (<button className="btn btn-warning"
                            onClick={handleDelete}
                        >Delete</button>) : ""}
                </div>
            </footer>
        </section>
    )
}