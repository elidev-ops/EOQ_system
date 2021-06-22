function validationComposite (input, validations) {
  for (const validation of validations) {
    const error = validation.validate(input)
    if (error) {
      return error
    }
  }
}

const compareFieldsValidation = (field, fieldToCompare) => {
  return { 
    validate: (input) => {
      if (input[field] !== input[fieldToCompare]) {
        return new InvalidParamError(fieldToCompare)
      }
    }
  }
}

const requiredFieldsValidation = (fieldName) => {
  return { 
    validate: (input) => {
      if (!input[fieldName]) {
        return new MissingParamError(fieldName)
      }
    }
  }
}

const emailValidation = (email) => {
  return {
    validate: (input) => {
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g
      if (!emailRegex.test(input[email])) {
        return new InvalidParamError(email)
      }
    }
  }
}
