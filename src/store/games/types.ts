export interface KeywordObject {
  [category: string]: string[]
}

export interface Game {
  description: string[]
  gamePath?: string
  height: number
  slug: string
  keywords: KeywordObject
  screenshots: string[]
  title: string
  url?: string
  width: number
}
