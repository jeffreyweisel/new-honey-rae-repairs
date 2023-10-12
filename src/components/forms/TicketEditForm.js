import { useEffect, useState } from "react"
import { editTicket, getServiceTickets, updateTicket } from "../../services/ticketServices"
import { useNavigate } from "react-router-dom"

export const TicketEditForm = ({ currentUser }) => {

    const [ticket, setTicket] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getServiceTickets(ticket.id).then((data) => {
            const ticketObj = data[0]
            setTicket(ticketObj)
        })
    }, [ticket])


    const handleSave = () => {
        const savedTicket = {
            id: ticket.id,
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency,
            dateCompleted: new Date()
        }

        updateTicket(savedTicket).then(() => {
            navigate('/')
        })
    }

    const handleInputChange = (event) => {
        const stateCopy = { ...ticket }
        stateCopy[event.target.name] = event.target.value
        setTicket(stateCopy)
      }

    return (
        <form className="profile">
            <h2>Update Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        value={ticket.description ? ticket.description : ''}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="description" />
                </div>
            </fieldset>
            <div className="form-group">
                    <label>
                        Emergency:
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                const ticketCopy = {...ticket}
                                ticketCopy.emergency = event.target.checked
                                setTicket(ticketCopy)
                            }}
                        />
                    </label>
                </div>
            <fieldset>
                <div className="form-group">
                    <button
                        className="form-btn btn-primary"
                        onClick={handleSave}>

                        Save Profile
                    </button>
                </div>
            </fieldset>
        </form>
    )
}