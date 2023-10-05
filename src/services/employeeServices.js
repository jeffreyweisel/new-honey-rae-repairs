export const getAllEmployees =  () => {
    return fetch('http://localhost:8088/employees?_expand=user').then((response) => response.json())
    
}

export const getEmployeesByUserId = (userId) => {
    return fetch(`http://localhost:8088/employees?userId=${userId}&_expand=user&_embed=employeeTickets`).then(res => res.json())
}

export const getAllEmployeeTickets = () => {
    return fetch('http://localhost:8088/employeeTickets?_expand=employee').then(res => res.json())
}

export const updateEmployee = (employee) => {
    return fetch(`http://localhost:8088/employees/${employee.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }).then((response) => response.json())  //parsed w json becase it was throwing not a function error on line 32 in EmployeeForm.js
}
