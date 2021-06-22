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