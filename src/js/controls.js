import flyd from 'flyd'
import * as streams from './stream-register'


const ns = 'Controls'
const register = streams.register(ns)

const timeFmt = (n, l) => `${n}`.padStart(l, '0')

const toTime = (t) => {
  const mins = Math.floor(t / 60)
  const secs = Math.floor(t % 60)
  const ms = Math.round((t * 1000) % 1000)

  return `${timeFmt(mins, 2)}:${timeFmt(secs, 2)}.${timeFmt(ms, 3)}`
}

export default function Controls(id) {
  const startStream = register('startMarked', flyd.stream())
  const endStream = register('endMarked', flyd.stream())

  const markStart = document.getElementById('mark-start')
  markStart.addEventListener('click', startStream)
  const markStartView = document.getElementById('mark-start-view')

  const markEnd = document.getElementById('mark-end')
  markEnd.addEventListener('click', endStream)
  const markEndView = document.getElementById('mark-end-view')

  const currentTime = document.getElementById('current-time')

  const audio = streams.getNamespace('AudioPlayer')

  flyd.on(e => {
    currentTime.textContent = toTime(e.target.currentTime)
  }, audio.timeupdate)

  flyd.on(e => {
    markStartView.textContent = currentTime.textContent
  }, startStream)

  flyd.on(e => {
    if (currentTime.textContent > markStartView.textContent) {
      markEndView.textContent = currentTime.textContent
    }
  }, endStream)

  return streams.getNamespace(ns)
}

