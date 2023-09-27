//holds the user information that will be diaplyed based on the props that are passed 

import "./User.css"

export const User = ( {user}) => {
    return (
        <div className="user">
            <div>
            <div className="user-info">Name</div>
            {user.fullName}
            </div>
            <div className="user-info">Email</div>
            <div>
            {user.email}
            </div>
        </div>
    )
}