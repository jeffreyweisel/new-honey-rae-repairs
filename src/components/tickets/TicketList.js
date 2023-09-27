import { useEffect, useState } from "react"
import { getAllTickets } from "../../services/ticketServices"
import "./Tickets.css"
import { Ticket } from "./Ticket"
import { TicketFilterBar } from "./TicketFilterBar"


export const TicketList = () => {
    //Three state variables are initialized using the useState hook. These variables will hold different pieces of data for the component.
    const [allTickets, setAllTickets] = useState([]) //[stateVariable, setterFunction]
    const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
    const [filteredTickets, setFilteredTickets] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    //getAllTickets is imported and useEffect hook is used to fetch initial list of tickets
    useEffect(() => {
        getAllTickets().then(ticketsArray => {
            setAllTickets(ticketsArray)
            console.log("tickets set!")
        })

    }, []) //ONLY runs on initial render of component

    //useEffect hook filters the tickets based on the value of showEmergencyOnly and updates the filteredTickets state accordingly
    useEffect(() => {
        if (showEmergencyOnly) {
            const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
            setFilteredTickets(emergencyTickets)
        } else {
            setFilteredTickets(allTickets)
        }

    }, [showEmergencyOnly, allTickets])

    useEffect(() => {
        const foundTickets = allTickets.filter((ticket) => ticket.description.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredTickets(foundTickets)
    }, [searchTerm, allTickets])

    //returns JSX that defines its structure and appearance on the page
    return (
        <div className="tickets">
            <h2>Tickets</h2>
            <TicketFilterBar setShowEmergencyOnly={setShowEmergencyOnly} setSearchTerm={setSearchTerm} />
            <article className="tickets">
                {filteredTickets.map(ticketObj => {
                    return (<Ticket ticket={ticketObj} key={ticketObj.id} />
                    )
                })}
            </article>
        </div>
    )
}