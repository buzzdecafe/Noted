import flyd from 'flyd'
import * as streams from './stream-register'


const ns = 'AudioPlayer'
const register = streams.register(ns)

export default function AudioPlayer(id) {
  const audioEvts = [
    'audioprocess',
    'canplay',
    'canplaythrough',
    'complete',
    'durationchange',
    'emptied',
    'ended',
    'loadeddata',
    'loadedmetadata',
    'pause',
    'play',
    'playing',
    'ratechange',
    'seeked',
    'seeking',
    'stalled',
    'suspend',
    'timeupdate',
    'volumechange',
    'waiting'
  ]

  const audio = document.getElementById(id)
  audioEvts.forEach((evtName) => {
    register(evtName, flyd.stream())
    audio.addEventListener(evtName, streams.getStream(ns, evtName))
  })

  flyd.on(e => {
    audio.src = URL.createObjectURL(e.target.files[0])
    audio.classList.remove('no-show')
  }, streams.getStream('FileUpload', 'uploaded'))

  flyd.on(e => {
    audio.playbackRate = 1
  }, streams.getStream('Controls', 'rateChanged'))

  return streams.getNamespace(ns)
}
