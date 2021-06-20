const formEl = document.querySelector('[data-form]')

const stateAccounts = (() => {
  let exchangeRate = []
  return {
    setExchangeRate: (newExchangeRate) => exchangeRate = newExchangeRate,
    getExchangeRate: () => exchangeRate
  }
})()

function createElement (el, attrs) {
  const element = document.createElement(el)
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  return element
}

formEl.addEventListener('submit', submitHandle)

function accountAlreadyExists (accountData) {
  let isValid = false
  const data = stateAccounts.getExchangeRate()
  if (data) {
    for (const account of data) {
      if (account.username === accountData.username) {
        isValid = true
      }
    }
  }
  return isValid
}

const submitSection = (() => {
  return {
    signup: (data, target) => {
      delete data.passwordConfirmation
      const exists = accountAlreadyExists(data)
      if (!exists) {
        stateAccounts.setExchangeRate([...stateAccounts.getExchangeRate(), data])
        localStorage.setItem('accounts', JSON.stringify(stateAccounts.getExchangeRate()))
        insertMessageBoxInDOM({
          target,
          message: `Username ${data.username} registered successfully`,
          error: false
        })
        return
      }
      insertMessageBoxInDOM({
        target,
        message: `Username ${data.username} already exists`,
        error: true
      })
    },
    login: (data, target) => {
      const user = stateAccounts.getExchangeRate().find(account => {
        return account.username === data.username && account.password === data.password
      })
      if (user) {
        localStorage.setItem('loggedin', JSON.stringify(user))
        window.location.replace('dashboard.html')
        return
      }
      insertMessageBoxInDOM({
        target,
        message: `Username or password is incorrect`,
        error: true
      })
    }
  }
})()

function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
  })
}

function createDataObject (data) {
  const Obj = data.target.dataset.form === 'signup' ? { id: uuid() } : {}
  const inputs = Array.from(data.target).filter(el => el.tagName !== 'BUTTON')
  inputs.forEach(input => Obj[input.name] = input.value.trim())
  return Obj
}

const validationsArr = {
  signup: ['name', 'username', 'password', 'passwordConfirmation'],
  login: ['username', 'password']
}

function validations (data, arrValidation) {
  const validations = []
  for (const inputName of arrValidation) {
    validations.push(requiredFieldsValidation(inputName))
  }
  arrValidation.includes('passwordConfirmation')
    ? validations.push(compareFieldsValidation('password', 'passwordConfirmation'))
    : null
  return validationComposite(data, validations)
}

function createBoxMessage (value, error) {
  const msgBox = createElement('div', {})
  const text = createElement('span', {})
  msgBox.className = `r0-message ${error ? 'warning' : 'success'}`
  text.innerText = value
  msgBox.appendChild(text)
  return msgBox
}

function insertMessageBoxInDOM ({ target, message, error }) {
  const msgElement = target.querySelector('.r0-message')
  msgElement ? msgElement.remove() : null 
  const msg = createBoxMessage(message, error)
  target.prepend(msg)
  setTimeout(() => msg.remove(), 3000)
} 

function submitHandle (event) {
  event.preventDefault()
  const account = createDataObject(event)
  const error = validations(account, validationsArr[event.target.dataset.form])

  if (error) {
    insertMessageBoxInDOM({
      target: event.target,
      message: error.message,
      error: true
      })
    return 
  }
  submitSection[event.target.dataset.form](account, event.target)
}

(function startData () {
  const data = JSON.parse(localStorage.getItem('accounts'))
  const logged = JSON.parse(localStorage.getItem('loggedin'))
  logged ? window.location.replace('dashboard.html') : null
  data ? stateAccounts.setExchangeRate(data) : null
})()