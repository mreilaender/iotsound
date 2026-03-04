import { getIPAddress } from './utils'
import { constants } from './constants'
import BalenaAudio from 'balena-audio'

interface DeviceConfig {
  ip: string,
  type: string
}

export default class SoundConfig {
  public device: DeviceConfig = {
    ip: getIPAddress() ?? 'localhost',
    type: constants.balenaDeviceType
  }
  private audioBlock: BalenaAudio

  bindAudioBlock(audioBlock: BalenaAudio) {
    this.audioBlock = audioBlock
  }
}