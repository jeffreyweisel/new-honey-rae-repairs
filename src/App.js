import { useEffect, useState } from "react"
import { getAllTickets } from "./services/ticketServices"
import  "./App.css"

export const App = () => {
  //Three state variables are initialized using the useState hook. These variables will hold different pieces of data for the component.
  const [allTickets, setAllTickets] = useState([]) //[stateVariable, setterFunction]
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false)
  const [filteredTickets, setFilteredTickets] = useState([])

  //getAllTickets is imported and useEffect hook is used to fetch initial list of tickets
  useEffect(() => {
    getAllTickets().then(ticketsArray => {
      setAllTickets(ticketsArray)
      console.log("tickets set!")
    })

  }, []) //ONLY runs on initial render of component

  //useEffect hook filters the tickets based on the value of showEmergencyOnly and updates the filteredTickets state accordingly
  useEffect(() => {
    if(showEmergencyOnly) {
      const emergencyTickets = allTickets.filter(ticket => ticket.emergency === true)
      setFilteredTickets(emergencyTickets)
    } else {
      setFilteredTickets(allTickets)
    }
    
  }, [showEmergencyOnly, allTickets])
  
  //returns JSX that defines its structure and appearance on the page
  return (
    <div className="tickets">
      <h2>Tickets</h2>
      <div>
        <button className="filter-btn btn-primary" onClick = {() => {setShowEmergencyOnly(true)}}>Emergency</button>
      </div>
      <div>
        <button className="filter-btn btn-info" onClick = {() => {setShowEmergencyOnly(false)}}>Show All</button>
      </div>
      <article className="tickets">
        {filteredTickets.map(ticket => {
          return (
            <section className="ticket" key={ticket.id}>
              <header className="ticket-info">{ticket.id}</header>
              <div>{ticket.description}</div>
              <footer>
                <div>
                  <div className="ticket-info">emergency</div>
                  <div>{ticket.emergency ? "yes" : "no"}</div>
                </div>
              </footer>
            </section>
          )
        })}
      </article>
    </div>
  )
}
