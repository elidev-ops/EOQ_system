const service = {
  client: () => {
    console.log('Client service')
  },
  service: () => {
    console.log('Service service')
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
  const error = validations(data, validationsArr[form])
  if (error) {
    insertMessageBoxInDOM({
      target: event.target,
      message: error.message,
      error: true
      })
    return 
  }
  service[form]()
}

document.addEventListener('submit', databaseSaveHandle)