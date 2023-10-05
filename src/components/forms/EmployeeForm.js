import { useEffect, useState } from "react"
import "./Form.css"
import { getEmployeesByUserId, updateEmployee } from "../../services/employeeServices"
import { useNavigate } from "react-router-dom"


export const EmployeeForm = ({ currentUser }) => {

    const [employee, setEmployee] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        getEmployeesByUserId(currentUser.id).then((data) => {
            const employeeObj = data[0]
            setEmployee(employeeObj)
        })
    }, [currentUser])


    const handleSave = (event) => {
        event.preventDefault()
        console.log('Clicked')

        const editedEmployee = {
            id: employee.id,
            specialty: employee.specialty,
            rate: employee.rate,
            userId: employee.userId,
        }

        updateEmployee(editedEmployee).then(() => {
            navigate(`/employees/${currentUser.id}`)
        })
    }

    const handleInputChange = (event) => {
        const stateCopy = { ...employee }
        stateCopy[event.target.name] = event.target.value
        setEmployee(stateCopy)
      }

    return (
        <form className="profile">
            <h2>Update Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label>Specialty: </label>
                    <input
                        type="text"
                        value={employee.specialty ? employee.specialty : ''}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="specialty" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Hourly Rate: </label>
                    <input type="number"
                        value={employee.rate ? employee.rate : 0}
                        onChange={handleInputChange}
                        required
                        className="form-control"
                        name="rate" />
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