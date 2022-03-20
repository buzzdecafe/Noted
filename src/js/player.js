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

  const evtStreams = audioEvts.reduce((acc, evtName) => ({ ...acc, [evtName]: flyd.stream() }), {})
  const streams = {
    ...evtStreams,
    currentTime: flyd.map(e => e.target.currentTime, evtStreams.timeupdate)
  }

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

      flyd.on(e => {
        audio.currentTime = deps.controls.streams.start()
      }, streams.play)

      flyd.on(e => {
        if (audio.currentTime > deps.controls.streams.end) {
          audio.pause()
        }
      }, streams.timeupdate)
    }
  }
}
