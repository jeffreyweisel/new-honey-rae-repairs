import { Routes, Route, Outlet } from "react-router-dom"
import { Welcome } from "../components/welcome/Welcome"
import { CustomerNav } from "../components/nav/CustomerNav"
import { TicketList } from "../components/tickets/TicketList"
import { TicketForm } from "../components/forms/TicketForm"
import { TicketEditForm } from "../components/forms/TicketEditForm"
import { CustomerForm } from "../components/forms/CustomerForm"



export const CustomerViews = ({currentUser, ticket}) => {

    return <>
    <Routes>
        <Route path ="/" element={
            <>
            <CustomerNav />
            <Outlet />
            </>
        }>

            <Route index element={<Welcome />} />
            <Route path="tickets">
                <Route index element={<TicketList currentUser={currentUser}/>} /> 
            <Route path="create" element={<TicketForm currentUser={currentUser}/>} />
            <Route path="edit/:ticketId" element={< TicketEditForm currentUser={currentUser} ticket={ticket} />}/>
            
            </Route>
            <Route path="profile" element={< CustomerForm currentUser={currentUser}/>}/>
      
        </Route>
    </Routes>
    </>
}