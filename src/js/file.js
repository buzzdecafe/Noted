import flyd from 'flyd'
import filter from 'flyd/module/filter'


export default function FileUpload() {
  const fileChanged = flyd.stream()

  return {
    streams: {
      changed: fileChanged,
      uploaded: filter(e => e.target && e.target.files && e.target.files.length === 1, fileChanged)
    },

    connect: (id, _deps) => {
      const uploadElem = document.getElementById(id)
      uploadElem.addEventListener('change', fileChanged)
    }
  }
}
