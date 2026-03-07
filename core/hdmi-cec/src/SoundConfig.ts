import { getIPAddress } from './utils'
import BalenaAudio from 'balena-audio'
import {CecMonitor, Remote} from "hdmi-cec";

interface DeviceConfig {
  ip: string
}

export default class SoundConfig {
  public device: DeviceConfig = {
    ip: getIPAddress() ?? 'localhost'
  }
  private audioBlock: BalenaAudio
  private cecRemote: Remote
  private cecMonitor: CecMonitor

  bindAudioBlock(audioBlock: BalenaAudio) {
    this.audioBlock = audioBlock
  }

  bindRemote(remote: Remote) {
    this.cecRemote = remote
  }

  getCecRemote(): Remote {
    return this.cecRemote
  }

  bindCecMonitor(cecMonitor: CecMonitor) {
    this.cecMonitor = cecMonitor
  }

  getCecMonitor(): CecMonitor {
    return this.cecMonitor
  }
}