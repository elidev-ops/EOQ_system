function state () {
  let exchangeRate = []
  return [
    function getExchangeRate () { return exchangeRate },
    function setExchangeRate (newExchangeRate) { exchangeRate = newExchangeRate }
  ]
}

const [clients, setClients] = state()
const [services, setServices] = state()

const iife = (function() {
  console.log('Função auto-invocável')
  const clientsDataCache = cache.get('clients')
  const clientsData = clientsDataCache 
    ? clientsDataCache.filter(client => client.accountId === logged.id) : []
    
  const servicesDataCache = cache.get('services')
  const servicesData = servicesDataCache 
    ? servicesDataCache.filter(service => service.accountId === logged.id) : []

  clientsData ? setClients(clientsData) : null
  servicesData ? setServices(servicesData) : null
})()

function updateSelectClients () {
  const select = document.querySelector('[data-el="select"]')
  const options = clients().reduce((acc, client) => 
    acc += `<option value="${client.id}">${client.name}</option>`, '')
  
   select.innerHTML = select.firstElementChild.outerHTML + options
}

const service = {
  client: (target, data) => {
    const exists = dataAlreadyExists(clients(), data, 'email', 'phoneNumber')
    if (!exists.result) {
      setClients([...clients(), data])
      cache.set('clients', clients())
      updateSelectClients()
      updateCountItens()
      insertMessageBoxInDOM({
        target,
        message: `The client ${data.name} registered successfully`,
        error: false
      })
      return
    }
    insertMessageBoxInDOM({
      target,
      message: `The ${exists.error} already exists`,
      error: true
    })
  },
  service: (target, data) => {
    data.status = false
    setServices([...services(), { ...data, status: false, amount: -Number(data.amount) }])
    cache.set('services', services())
    updateCountItens()
    insertMessageBoxInDOM({
      target,
      message: `The service ${data.name} registered successfully`,
      error: false
    })
  }
}

const validationsArr = {
  client: ['name', 'email', 'phoneNumber'],
  service: ['name', 'amount', 'description', 'client']
}

function validations (data, arrValidation) {
  const validations = []
  for (const inputName of arrValidation) {
    validations.push(requiredFieldsValidation(inputName))
  }
  arrValidation.includes('email') 
    ? validations.push(emailValidation('email'))
    : null
  return validationComposite(data, validations)
}

function databaseSaveHandle (event) {
  const { form } = event.target.dataset
  event.preventDefault();
  const data = createDataObject(event)
  data.accountId = logged.id
  const error = validations(data, validationsArr[form])
  if (error) {
    insertMessageBoxInDOM({
      target: event.target,
      message: error.message,
      error: true
      })
    return 
  }
  service[form](event.target, data)
}

document.addEventListener('submit', databaseSaveHandle)
