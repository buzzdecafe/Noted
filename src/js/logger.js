import flyd from 'flyd'


const toLogStr = (type, body) => {
  const now = new Date().toLocaleString('en-US', { hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })
  return `${now} :: ${type} :: ${body}`
}

const errStream = flyd.stream()
window.addEventListener('error', errStream)

const logElem = (elem, str) => {
  const li = document.createElement('li')
  li.textContent = str
  elem.appendChild(li)
}

const logEvent = elem => e => {
  return typeof e === 'object'
    ? logElem(elem, toLogStr(e.type, e.target.id))
    : logElem(elem, toLogStr('_app_', e))
}

const excludeEvents = ['currentTime', 'timeupdate']
const toStreams = deps => {
  return Object.entries(deps)
    .flatMap(([_k, v]) =>
      Object.entries(v.streams)
        .filter(([k, _v]) => !excludeEvents.includes(k))
        .map(([_k, v]) => v)
    )
}

export default function Logger() {

  return {
    streams: {},

    connect: (id, deps) => {
      const elem = document.getElementById(id)
      const observer = new MutationObserver((mutationsList, _obsrvr) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') elem.scrollTop = elem.scrollHeight
        }
      })
      observer.observe(elem, { childList: true })

      const log = logEvent(elem)

      toStreams(deps).forEach(stream => {
        flyd.on(log, stream)
      })

      flyd.on(e => {
        debugger
        logElem(elem, toLogStr(e.type, e.target.id))
      }, errStream)
    }
  }
}
