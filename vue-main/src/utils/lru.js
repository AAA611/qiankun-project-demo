import EventEmitter from "./Eventemitter"

export default class LRU extends EventEmitter {
  constructor(max = 5) {
    this.cache = new Map()
    this.max = max
  }

  get size() {
    return this.cache.size()
  }

  put(key, value) {
    if (this.size() === this.max) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
    this.cache.set(key, value)
    this.emit('update')
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, value)
    }
  }
}