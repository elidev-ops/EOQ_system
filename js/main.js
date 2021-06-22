function updateCountItens () {
  const clientsDataCache = cache.get('clients')
  const clientsData = clientsDataCache ? clientsDataCache.filter(client => client.accountId === logged.id) : []
  const servicesDataCache = cache.get('services') 
  const servicesData = servicesDataCache ? servicesDataCache.filter(service => service.accountId === logged.id) : []

  const amountClientEl = document.querySelector('[data-amount="clients"]')
  const amountServiceEl = document.querySelector('[data-amount="services"]')

  amountClientEl.innerHTML = clientsData ? clientsData.length : 0
  amountServiceEl.innerHTML = servicesData ? servicesData.length : 0
}

updateCountItens()