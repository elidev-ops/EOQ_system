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
