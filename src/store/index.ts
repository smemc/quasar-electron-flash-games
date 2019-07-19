import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { RootState } from './types'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */): Store<RootState> {
  const store = new Vuex.Store<RootState>({
    state: {
      appName: process.env.APP_NAME || '',
      appVersion: process.env.APP_VERSION || ''
    },
    getters: {
      appName: state => state.appName,
      appVersion: state => state.appVersion
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV
  })

  return store
}
