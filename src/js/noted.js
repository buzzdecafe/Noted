import AudioPlayer from './audio-player'
import Controls from './controls'
import FileUpload from './file'
import Logger from './logger'


const onReady = () => {
  const file = FileUpload()
  const player = AudioPlayer()
  const controls = Controls('controls')
  const logger = Logger('logger-list')

  file.connect('tune-file', {})
  player.connect('audio', { file, controls })
  controls.connect('controls', { player })
  logger.connect('logger-list', { controls, file, player })
}

document.addEventListener('DOMContentLoaded', onReady);
