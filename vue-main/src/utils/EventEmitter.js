export default class EventEmitter {
  constructor() {
    this.eventsMap = {}
  }

  on(eventName, cb) {
    if (this.eventsMap[eventName]) {
      this.eventsMap[eventName].push(cb)
    } else {
      this.eventsMap[eventName] = [cb]
    }
  }
  off(eventName, cb) {
    if (!cb) {
      this.eventsMap[eventName] = null
    } else {
      const index = this.eventsMap[eventName].indexOf(cb)
      this.eventsMap[eventName].splice(index, 1)
    }
  }
  emit(eventName, ...args) {
    const cbs = this.eventsMap[eventName]
    if (cbs?.length) {
      cbs.forEach(cb => cb(...args))
    }
  }
}