import flyd from 'flyd'
import filter from 'flyd/module/filter'
import * as streams from './stream-register'


const ns = 'FileUpload'
const register = streams.register(ns)

export default function FileUpload(id) {
  const fileChanged = flyd.stream()
  register('changed', fileChanged)
  register('uploaded', filter(e => e.target && e.target.files && e.target.files.length === 1, fileChanged))

  const uploadElem = document.getElementById(id)
  uploadElem.addEventListener('change', fileChanged)

  return streams.getNamespace(ns)
}
