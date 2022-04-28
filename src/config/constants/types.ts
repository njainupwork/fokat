// Define Props type for dark themes
export type Dark = {
  background: BackgroundType
  color: ColorType
  card: CardType
}

// Define Props type for light themes
export type Light = {
  background: BackgroundType
  color: ColorType
  card: CardType
}

export type BackgroundType = {
  main: string
  green: string
}

export type ColorType = {
  main: string
}

export type CardType = {
  main: string
}

export interface Address {
  5?: string
  42?: string
  97?: string
  56: string
}
