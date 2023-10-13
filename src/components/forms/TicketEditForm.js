import { useEffect, useState } from "react"
import { editTicket, getServiceTicket } from "../../services/ticketServices"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEditForm = ({ currentUser }) => {



    const {ticketId} = useParams()
    const navigate = useNavigate()
    const [ticket, setTicket] = useState({})



    useEffect(() => {
        
        
        getServiceTicket(ticketId).then((ticket) => {
            console.log(ticketId)
            
            setTicket(ticket)
            
            
        })
    }, [ticketId])


    const handleSave = (e) => {
        e.preventDefault()
        if (ticket.description) {
            const editedTicket = {
                id: ticket.id,
                userId: currentUser.id,
                description: ticket.description,
                emergency: ticket.emergency,
                dateCompleted: ticket.dateCompleted
            }
            editTicket(editedTicket).then(() => {
                console.log(editedTicket)
                navigate('/tickets')
            })

        } else {
            window.alert('Please fill out description')

        }

    }

    return (
        <form>
            <h2>Edit Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        value={ticket.description ? ticket.description : ''}
                        onChange={(event) => {
                            const ticketCopy = { ...ticket }
                            ticketCopy.description = event.target.value
                            setTicket(ticketCopy)
                        }}

                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>
                        Emergency:
                        <input
                            type="checkbox"
                            onChange={(event) => {
                                const ticketCopy = { ...ticket }
                                ticketCopy.emergency = event.target.checked
                                setTicket(ticketCopy)
                            }}

                        />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="btn-primary form-btn" onClick={handleSave}>Save Changes</button>
                </div>
            </fieldset>
        </form>
    )
}