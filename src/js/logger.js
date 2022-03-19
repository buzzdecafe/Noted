import flyd from 'flyd'


const logStr = (type, body) => {
  const now = new Date().toLocaleString('en-US', { hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })
  return `${now} :: ${type} :: ${body}`
}

window.onerror = flyd.stream()

const logElem = elem => str => {
  const li = document.createElement('li')
  li.textContent = str
  elem.appendChild(li)
}

export default function Logger() {

  return {
    streams: {},

    connect: (id, deps) => {
      const elem = document.getElementById(id)
      const log = logElem(elem)

      flyd.on(e => {
        log(logStr(e.type, e.target.id))
      }, deps.file.streams.uploaded)

      flyd.on(e => {
        log(logStr(e.type, e.target.id))
      }, deps.controls.streams.startMarked)

      flyd.on(e => {
        log(logStr(e.type, e.target.id))
      }, deps.controls.streams.endMarked)

      flyd.on(e => {
        log(logStr(e.type, e.target.id))
      }, window.onerror)
    }
  }
}
