function createElement (el, attrs) {
  const element = document.createElement(el)
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
  return element
}
