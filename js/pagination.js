const sidebarEl = document.querySelector('.r0-sidebar_navbar')
const mainEl = document.querySelector('.r0-main')
let mainNavBarEl = null

async function getPage(page) {
  const responseData = await fetch(`pages/${page}.html`)
  return await responseData.text()
}

function loading() {
  const div = document.createElement('div')
  const span_first = document.createElement('span')
  const span_second = document.createElement('span')
  const span_third = document.createElement('span')

  div.append(span_first)
  div.append(span_second)
  div.append(span_third)
  div.className = 'loading'
  return div
}

function navTab() {
  mainNavBarEl = document.querySelector('[data-js="main-navbar"]')
  mainNavBarEl.addEventListener('click', event => {
    const { tagName, dataset } = event.target

    const activeButton = Array.from(mainNavBarEl.querySelectorAll('button'))
      .find(el => el.classList.contains('active'))
    const activeForm = Array.from(document.querySelectorAll('form'))
      .find(el => el.classList.contains('active'))

    if (tagName === 'BUTTON') {
      activeForm.classList.remove('active')
      activeButton.classList.remove('active')
      event.target.classList.add('active')
      document.querySelector(`[data-form="${dataset.js}"]`).classList.add('active')
    }

    event.stopPropagation()
  })
}

const pageFunctions = (() => {
  return {
    main: () => { },
    create: () => {
      navTab()
    },
    list: () => {
      navTab()
    }
  }
})()

async function handlePage(event) {
  const { page } = event.target.dataset
  if (event.target.tagName === 'BUTTON') {
    mainEl.prepend(loading())
    const response = await getPage(page)
    mainEl.innerHTML = response
  }
  pageFunctions[page]()
}

sidebarEl.addEventListener('click', handlePage)

document.addEventListener('submit', event => {
  event.preventDefault()
})
