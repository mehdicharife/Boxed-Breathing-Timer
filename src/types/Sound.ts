import { IconType } from 'react-icons'

export type Sound = {
  name: string
  description: string
  icon: IconType
  audioFileName: string
  audio?: HTMLAudioElement
}
