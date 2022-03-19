import flyd from 'flyd'
import filter from 'flyd/module/filter'


export default function FileUpload() {
  const changed = flyd.stream()
  const uploaded = filter(e => e.target && e.target.files && e.target.files.length === 1, changed)

  return {
    streams: {
      changed,
      uploaded,
    },

    connect: (id, _deps) => {
      const fileSection = document.getElementById('load-file')
      const overlay = document.getElementById('overlay')
      const uploadElem = document.getElementById(id)

      uploadElem.addEventListener('change', changed)

      flyd.on(e => {
        fileSection.classList.add('no-show')
        overlay.classList.add('no-show')
      }, uploaded)
    }
  }
}
