export const getCustomerByUserId = (userId) => {
    return fetch(`http://localhost:8088/customers?userId=${userId}&_expand=user`).then(res => res.json())
}

export const updateCustomer = (customer) => {
    return fetch(`http://localhost:8088/customers/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    }).then((response) => response.json())  //parsed w json becase it was throwing not a function error on line 32 in EmployeeForm.js
}
