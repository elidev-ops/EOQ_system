function cacheDataRequest () {
  return {
    set: (collection, data) => {
      localStorage.setItem(`${logged.username}_${collection}`, JSON.stringify(data))
    },
    get: (collection) => JSON.parse(localStorage.getItem(`${logged.username}_${collection}`))
  }
}

const cache = cacheDataRequest()