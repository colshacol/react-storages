export const localStorage = {
  storage: {},

  getItem(key) {
    return localStorage.storage[key]
  },

  setItem(key, value) {
    localStorage.storage[key] = value
    emitStorageChangedEvent({ key, value })
  },

  removeItem(key) {
    delete localStorage.storage[key]
  },

  clear() {
    this.storage = {}
  },
}

const emitStorageChangedEvent = (detail) => {
  const event = new CustomEvent('localStorageChanged', { detail })
  dispatchEvent(event)
}
