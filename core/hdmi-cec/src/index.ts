import BalenaAudio from 'balena-audio'
import SoundConfig from './SoundConfig'
import {CecMonitor, OperationCode, Remote} from 'hdmi-cec'

// balenaSound core
const config: SoundConfig = new SoundConfig()
const audioBlock: BalenaAudio = new BalenaAudio(`tcp:${config.device.ip}:4317`)
config.bindAudioBlock(audioBlock)

var remote = new Remote()

remote.monitor.on('ready', (cecMonitor: CecMonitor) => {
  console.log('CECMonitor is ready!')

  config.bindCecMonitor(cecMonitor)

  // cecMonitor.stdinHandlers.push({
  //   match: /^.*$/g,
  //   callback: line => { console.log(line) }
  // })


})

init()
async function init() {
  await audioBlock.listen()
}

// Event: "play"
// Source: audio block
// On audio playback, set this server as the multiroom-master
// We check the input sink that receives all audio sources
audioBlock.on('play', async (sink: any) => {
  console.log(`[event] Sound started playing, sending CEC active source`)

  const cecMonitor = config.getCecMonitor()
  console.log('Cec monitor address: ' + cecMonitor.deviceAddress)
  cecMonitor.send("as")
  // cecMonitor.executeOperation(cecMonitor.deviceAddress, OperationCode.ACTIVE_SOURCE)
  // config.getCecMonitor().executeBroadcastOperation(OperationCode.ACTIVE_SOURCE)

  // remote.monitor.executeBroadcastOperation(OperationCode.ACTIVE_SOURCE)
  // await sendCecActiveSource()
})

audioBlock.on('stop', async (sink: any) => {
	console.log('[event] Audio has stopped playing, sending CEC inactive source')
  console.log('sink name:' + sink.name)

  config.getCecMonitor().send("is")
  // remote.monitor.executeBroadcastOperation(OperationCode.INACTIVE_SOURCE)

  // await sendCecInactiveSource()
})