function dataAlreadyExists (state, accountData, firstValue, secondValue) {
  let isValid = { result: false }
  if (state) {
    for (const account of state) {
      if (account[firstValue] === accountData[firstValue] || account[secondValue] === accountData[secondValue]) {
        isValid.error = account[firstValue] === accountData[firstValue] 
          ? accountData[firstValue] : accountData[secondValue]
        isValid.result = true
      }
    }
  }
  return isValid
}