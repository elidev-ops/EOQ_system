const formEl = document.querySelector('[data-form]')

const stateAccounts = (() => {
  let exchangeRate = []
  return {
    setExchangeRate: (newExchangeRate) => exchangeRate = newExchangeRate,
    getExchangeRate: () => exchangeRate
  }
})()

formEl.addEventListener('submit', submitHandle)

function accountAlreadyExists (accountData) {
  let isValid = { result: false }
  const data = stateAccounts.getExchangeRate()
  if (data) {
    for (const account of data) {
      if (account.username === accountData.username || account.email === accountData.email) {
        isValid.error = account.username === accountData.username 
          ? accountData.username : accountData.email
        isValid.result = true
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
      if (!exists.result) {
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
        message: `The ${exists.error} already exists`,
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

const validationsArr = {
  signup: ['name', 'username', 'email', 'password', 'passwordConfirmation'],
  login: ['username', 'password']
}

function validations (data, arrValidation) {
  const validations = []
  for (const inputName of arrValidation) {
    validations.push(requiredFieldsValidation(inputName))
  }
  arrValidation.includes('email')
    ? validations.push(emailValidation('email'))
    : null
  arrValidation.includes('passwordConfirmation')
    ? validations.push(compareFieldsValidation('password', 'passwordConfirmation'))
    : null
  return validationComposite(data, validations)
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