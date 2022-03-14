import flyd from 'flyd'


const logStr = (type, body) => {
  const now = new Date().toLocaleString('en-US', { hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })
  return `${now} :: ${type} :: ${body}`
}

const log = console.log

export default function Logger() {

  return {
    streams: {},

    connect: (_id, deps) => {
      flyd.on(e => {
        log(logStr(e.type, e.originalTarget.id))
      }, deps.file.streams.uploaded)

      flyd.on(e => {
        log(logStr(e.type, e.originalTarget.id))
      }, deps.controls.streams.startMarked)

      flyd.on(e => {
        log(logStr(e.type, e.originalTarget.id))
      }, deps.controls.streams.endMarked)
    }
  }
}
