import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators'
import { Game, KeywordObject } from './types'
import { accentFold, getGames } from '../utils/functions'
import store from '../../store'

const GAME_SKEL: Game = {
  description: ['__SKEL__DESCRIPTION__'],
  height: 1,
  slug: '__SKEL_SLUG__',
  screenshots: [],
  keywords: { '__SKEL_CATEGORY__': ['__SKEL_KEYWORD__'] },
  title: '__SKEL_TITLE__',
  width: 1
}

@Module({
  store: store(),
  dynamic: true,
  namespaced: true,
  name: 'games'
})
export class GamesModule extends VuexModule {
  private _games: Game[] = []
  private _selectedKeywords: string[] = []
  private _search: string = ''
  private _subtitle: string = ''
  private _localOnly: boolean = false
  private _currentPage = 1
  private _perPage = 20

  @Mutation
  private ADD_GAME (payload: Game): void {
    this._games.push(payload)
  }

  @Mutation
  private SELECT_KEYWORDS (payload: string[]): void {
    this._selectedKeywords = payload
  }

  @Mutation
  private SET_SEARCH (payload: string): void {
    this._search = payload || ''
  }

  @Mutation
  private SET_SUBTITLE (payload: string): void {
    this._subtitle = payload
  }

  @Mutation
  private SET_LOCAL_ONLY (payload: boolean): void {
    this._localOnly = payload
  }

  @Mutation
  private SET_CURRENT_PAGE (payload: number): void {
    this._currentPage = payload
  }

  @Mutation
  private SET_PER_PAGE (payload: number): void {
    this._perPage = payload
  }

  @Action
  public async init (): Promise<void> {
    const allGamePromises = await getGames()

    allGamePromises.forEach(async gamePromise => {
      const game = await gamePromise

      this.ADD_GAME(game)
    })
  }

  @Action
  public async selectKeywords (payload: string[]): Promise<void> {
    this.SELECT_KEYWORDS(payload)
  }

  @Action
  public async setSearch (payload: string): Promise<void> {
    this.SET_SEARCH(payload)
  }

  @Action
  public async setSubtitle (payload: string): Promise<void> {
    this.SET_SUBTITLE(payload)
  }

  @Action
  public async setLocalOnly (payload: boolean): Promise<void> {
    this.SET_LOCAL_ONLY(payload)
  }

  @Action
  public async setCurrentPage (payload: number): Promise<void> {
    this.SET_CURRENT_PAGE(payload)
  }

  @Action
  public async setPerPage (payload: number): Promise<void> {
    this.SET_PER_PAGE(payload)
  }

  public get games (): Game[] {
    return this._games
  }

  public get categories (): string[] {
    return this._games
      .reduce(
        (uniqueCategories: string[], game) =>
          [...uniqueCategories,
            ...Object.keys(game.keywords).filter(
              item => !uniqueCategories.includes(item)
            )
          ],
        []
      )
      .sort()
  }

  public get keywords (): string[] {
    return this.categories.reduce(
      (uniqueCategories: string[], category) => ({
        ...uniqueCategories,
        [category as keyof KeywordObject]: this._games
          .reduce(
            (uniqueKeywords: string[], game) =>
              [...uniqueKeywords,
                ...game.keywords.hasOwnProperty(category)
                  ? game.keywords[category as keyof KeywordObject].filter(
                    item => !uniqueKeywords.includes(item)
                  )
                  : []
              ],
            []
          )
          .sort()
      }),
      []
    )
  }

  public get selectedKeywords (): string[] {
    return this._selectedKeywords
  }

  public get search (): string {
    return this._search
  }

  public get subtitle (): string {
    return this._subtitle
  }

  public get localOnly (): boolean {
    return this._localOnly
  }

  public get getGameById () {
    return (slug: string): Game =>
      this._games.find(game => game.slug === slug) || GAME_SKEL
  }

  public get filteredGames (): Game[] {
    return this._games
      .filter(game =>
        accentFold(game.title.toLowerCase()).includes(
          accentFold(this._search.toLowerCase())
        ) &&
            (this._localOnly ? game.gamePath : true) &&
            (this._selectedKeywords.length === 0 ||
              this._selectedKeywords.some(keyword =>
                Object.values(game.keywords).flat().includes(keyword)
              ))
      )
      .reduce(
        (filteredGames: Game[], game) => [...filteredGames, game],
        []
      )
  }

  public get currentPage (): number {
    return this._currentPage
  }

  public get perPage (): number {
    return this._perPage
  }

  public get lastPage (): number {
    return Math.ceil(this.filteredGames.length / this._perPage)
  }

  public get paginatedGames (): Game[] {
    const offset = (this._currentPage - 1) * this._perPage

    return this.filteredGames.slice(offset).slice(0, this._perPage)
  }
}

export default getModule(GamesModule)
