const logged = JSON.parse(localStorage.getItem('loggedin'))
if (!logged) {
  window.location.replace('index.html')
}

const accountNameEl = document.querySelector('.group-info > b')
const accountHoleEl = document.querySelector('.group-info > span')
const btnLogoutEl = document.querySelector('[data-js="logout"]')

accountNameEl.innerHTML = logged.name
accountHoleEl.innerHTML = 'Administrator'

btnLogoutEl.addEventListener('click', () => {
  localStorage.removeItem('loggedin')
  window.location.reload()
})