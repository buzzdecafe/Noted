import flyd from 'flyd'


export default function AudioPlayer() {
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


  const streams = audioEvts.reduce((acc, evtName) => ({ ...acc, [evtName]: flyd.stream() }), {})

  return {
    streams,
    connect: (id, deps) => {
      const audio = document.getElementById(id)
      audioEvts.forEach((evtName) => {
        audio.addEventListener(evtName, streams[evtName])
      })

      flyd.on(e => {
        audio.src = URL.createObjectURL(e.target.files[0])
        audio.classList.remove('no-show')
      }, deps.file.streams.uploaded)

      flyd.on(e => {
        audio.playbackRate = parseFloat(e.target.value)
      }, deps.controls.streams.rateChanged)
    }
  }
}
