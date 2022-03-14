import flyd from 'flyd'


const timeFmt = (n, l) => `${n}`.padStart(l, '0')

const toTime = (t) => {
  const mins = Math.floor(t / 60)
  const secs = Math.floor(t % 60)
  const ms = Math.round((t * 1000) % 1000)

  return `${timeFmt(mins, 2)}:${timeFmt(secs, 2)}.${timeFmt(ms, 3)}`
}

export default function Controls() {
  const streams = {
    endMarked: flyd.stream(),
    rateChanged: flyd.stream(),
    startMarked: flyd.stream()
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

      flyd.on(e => {
        currentTime.textContent = toTime(e.target.currentTime)
      }, deps.player.streams.timeupdate)

      flyd.on(e => {
        markStartView.textContent = currentTime.textContent
      }, streams.startMarked)

      flyd.on(e => {
        if (currentTime.textContent > markStartView.textContent) {
          markEndView.textContent = currentTime.textContent
        }
      }, streams.endMarked)
    }

  }
}

