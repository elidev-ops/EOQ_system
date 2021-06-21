const loggedIn = JSON.parse(localStorage.getItem('loggedin'))
const clientsData = JSON.parse(localStorage.getItem('clients'))
const servicesData = JSON.parse(localStorage.getItem('services'))

const amountClientEl = document.querySelector('[data-amount="clients"]')
const amountServiceEl = document.querySelector('[data-amount="services"]')

amountClientEl.innerHTML = clientsData ? clientsData.length : 0
amountServiceEl.innerHTML = servicesData ? servicesData.length : 0