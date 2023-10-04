export const getAllEmployees =  () => {
    return fetch('http://localhost:8088/employees?_expand=user').then((response) => response.json())
    
}

export const getEmployeesByUserId = (userId) => {
    return fetch(`http://localhost:8088/employees?userId=${userId}&_expand=user&_embed=employeeTickets`).then(res => res.json())
}

export const getAllEmployeeTickets = () => {
    return fetch('http://localhost:8088/employeeTickets?_expand=employee').then(res => res.json())
}