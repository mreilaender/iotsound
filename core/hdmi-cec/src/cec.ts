import { exec } from 'child_process'

export function sendCecActiveSource(): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = `echo "as" | cec-client -s -d 1`

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('CEC error:', error)
        reject(error)
      } else {
        console.log('CEC sent:', stdout)
        resolve()
      }
    })
  })
}