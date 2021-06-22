function createDataObject (data) {
  const Obj = data.target.dataset.form === 'signup' ? { id: uuid() } : {}
  const inputs = Array.from(data.target).filter(el => el.tagName !== 'BUTTON')
  inputs.forEach(input => Obj[input.name] = input.value.trim())
  return Obj
}
