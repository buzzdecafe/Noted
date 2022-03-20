import flyd from 'flyd'


const timeFmt = (n, l) => `${n}`.padStart(l, '0')

const toTime = (t) => {
  const mins = Math.floor(t / 60)
  const secs = Math.floor(t % 60)
  const ms = Math.round((t * 1000) % 1000)

  return `${timeFmt(mins, 2)}:${timeFmt(secs, 2)}.${timeFmt(ms, 3)}`
}

const isset = t => (/^\d\d:\d\d.\d\d\d$/).test(t)


export default function Controls() {
  const streams = {
    endMarked: flyd.stream(),
    rateChanged: flyd.stream(),
    startMarked: flyd.stream(),
    start: flyd.stream(),
    end: flyd.stream(),
    state: flyd.stream('controls:state:INIT')
  }

  return {
    streams,

    connect: (_id, deps) => {
      const markStart = document.getElementById('mark-start')
      markStart.addEventListener('click', streams.startMarked)
      const markStartView = document.getElementById('mark-start-view')

      const markEnd = document.getElementById('mark-end')
      markEnd.addEventListener('click', streams.endMarked)
      const markEndView = document.getElementById('mark-end-view')

      const currentTime = document.getElementById('current-time')

      const playbackRate = document.getElementById('playback-rate')
      playbackRate.addEventListener('change', streams.rateChanged)

      // file events
      flyd.on(_e => {
        currentTime.textContent = toTime(0)
        markStartView.textContent = toTime(0)
        streams.start(0)
      }, deps.file.streams.uploaded)

      // player events
      flyd.on(e => {
        currentTime.textContent = toTime(e.target.currentTime)
      }, deps.player.streams.timeupdate)

      flyd.on(e => {
        markEndView.textContent = toTime(e.target.duration)
      }, deps.player.streams.loadedmetadata)

      // internal events
      flyd.on(_e => {
        const t = deps.player.streams.currentTime()
        const tt = toTime(t)
        const endMark = markEndView.textContent
        if (!isset(endMark) || tt < endMark) {
          markStartView.textContent = tt
          streams.start(t)
        }
      }, streams.startMarked)

      flyd.on(e => {
        const t = deps.player.streams.currentTime()
        const tt = toTime(t)
        if (tt > markStartView.textContent) {
          markEndView.textContent = tt
          streams.end(t)
        }
      }, streams.endMarked)
    }

  }
}

