function changeTitle () {
  return {
    change: (string) => window.document.title = string + ' - EOQ System'
  }
}

const title = changeTitle()
