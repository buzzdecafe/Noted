import flyd from 'flyd'
import * as streams from './stream-register'


const logStr = (type, body) => {
  const now = new Date().toLocaleString('en-US', { hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })
  return `${now} :: ${type} :: ${JSON.stringify(body)}`
}

const log = console.log

export default function Logger(id) {
  flyd.on(e => {
    log(logStr(e.type, e))
  }, streams.getStream('FileUpload', 'uploaded'))

  flyd.on(e => {
    log(logStr(e.type, e))
  }, streams.getStream('Controls', 'startMarked'))

  flyd.on(e => {
    log(logStr(e.type, e))
  }, streams.getStream('Controls', 'endMarked'))
}
