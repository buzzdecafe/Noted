import AudioPlayer from './audio-player'
import Controls from './controls'
import FileUpload from './file'
import Logger from './logger'


const onReady = () => {
  FileUpload('tune-file')
  AudioPlayer('audio')
  Controls('controls')
  Logger('logger-list')
}

document.addEventListener('DOMContentLoaded', onReady);
