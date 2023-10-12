import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCustomerByUserId, updateCustomer } from "../../services/customerServices"



export const CustomerForm = ({ currentUser }) => {

    const [customer, setCustomer] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getCustomerByUserId(currentUser.id).then((data) => {
            const customerObj = data[0]
            setCustomer(customerObj)
        })
    }, [currentUser])


    const handleSave = (event) => {
        event.preventDefault()
        console.log('Clicked')

        const editedCustomer = {
            id: customer.id,
            address: customer.address,
            phoneNumber: customer.phoneNumber,
            userId: customer.userId,
        }

        updateCustomer(editedCustomer).then(() => {
            navigate(`/`)
        })
    }

    const handleInputChange = (event) => {
        const stateCopy = { ...customer }
        stateCopy[event.target.name] = event.target.value
        setCustomer(stateCopy)
      }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Address: </label>
                    <input
                        type="text"
                        value={customer.address ? customer.address : ''}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="address" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Phone Number: </label>
                    <input type="text"
                        value={customer.phoneNumber ? customer.phoneNumber : ''}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="phoneNumber" />
                </div>
            </fieldset>
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