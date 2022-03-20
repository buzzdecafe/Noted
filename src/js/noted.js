import Player from './player'
import Controls from './controls'
import FileUpload from './file'
import Logger from './logger'


const onReady = () => {
  const file = FileUpload()
  const player = Player()
  const controls = Controls()
  const logger = Logger()

  file.connect('tune-file', {})
  player.connect('audio', { file, controls })
  controls.connect('controls', { file, player })
  logger.connect('logger-list', { controls, file, player })
}

document.addEventListener('DOMContentLoaded', onReady);
