import BalenaAudio from 'balena-audio'
import SoundConfig from './SoundConfig'

// balenaSound core
const config: SoundConfig = new SoundConfig()
const audioBlock: BalenaAudio = new BalenaAudio(`tcp:${config.device.ip}:4317`)
config.bindAudioBlock(audioBlock)

init()
async function init() {
  await audioBlock.listen()
}

// Event: "play"
// Source: audio block
// On audio playback, set this server as the multiroom-master
// We check the input sink that receives all audio sources
audioBlock.on('play', async (sink: any) => {
  console.log(`[event] Sound played!`)
})