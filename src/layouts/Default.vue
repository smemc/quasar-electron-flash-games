<template>
  <QLayout view="lHh Lpr lFf">
    <QHeader elevated>
      <QToolbar class="q-electron-drag">
        <QAvatar square>
          <img src="statics/icon.png">
        </QAvatar>

        <QToolbarTitle>
          {{ title }}
        </QToolbarTitle>

        <QInput
          v-if="$route.path === '/'"
          v-model="search"
          class="absolute-center q-electron-drag--exception"
          style="max-width: 500px"
          dark
          dense
          standout
          autofocus
          label="Search games"
        >
          <template #append>
            <QIcon
              v-if="!search"
              name="search"
            />

            <QIcon
              v-else
              name="cancel"
              class="cursor-pointer"
              @click="search = ''"
            />
          </template>
        </QInput>

        <span
          v-else
          class="absolute-center text-subtitle1 text-weight-light"
        >
          {{ subtitle }}
        </span>

        <QBtnGroup flat>
          <QBtn
            v-if="$route.path.includes('/game')"
            icon="replay"
            label="Replay"
            @click="$router.replace({ path: $route.path, query: { reload: Math.random() } })"
          />

          <QBtn
            v-if="$route.path !== '/'"
            icon="home"
            label="Home"
            @click="$router.push('/')"
          />

          <QBtn
            v-else
            icon="info"
            label="About"
            @click="aboutDialog = true"
          />

          <QBtn
            dense
            flat
            icon="minimize"
            @click="minimize"
          />

          <QBtn
            dense
            flat
            icon="crop_square"
            @click="maximize"
          />

          <QBtn
            dense
            flat
            icon="close"
            @click="closeApp"
          />
        </QBtnGroup>
      </QToolbar>
    </QHeader>

    <QPageContainer>
      <RouterView :key="$route.fullPath"/>
    </QPageContainer>

    <MaeAboutDialog v-model="aboutDialog"/>
  </QLayout>
</template>

<script>
import { computed, createComponent, value } from 'vue-function-api'
import Games from '../store/games'
import MaeAboutDialog from '../components/MaeAboutDialog.vue'

export default createComponent({
  name: 'LayoutDefault',
  components: {
    MaeAboutDialog
  },
  setup (props, { root }) {
    const aboutDialog = value(false)
    const search = computed(() => Games.search, value => Games.setSearch(value))

    const title = computed(() => root.$store.getters.appName)
    const subtitle = computed(() => Games.subtitle)

    const minimize = () => {
      if (process.env.MODE === 'electron') {
        root.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    }

    const maximize = () => {
      if (process.env.MODE === 'electron') {
        const win = root.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    }

    const closeApp = () => {
      if (process.env.MODE === 'electron') {
        root.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }

    return {
      aboutDialog,
      title,
      subtitle,
      search,
      minimize,
      maximize,
      closeApp
    }
  }
})
</script>
