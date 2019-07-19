export interface KeywordObject {
  skills: string[]
  themes: string[]
  math: string[]
  language: string[]
  science: string[]
}

export interface Game {
  coverImage?: string
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