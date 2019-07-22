<template>
  <QPage ref="gamePage">
    <embed
      v-if="game.gamePath"
      :src="game.gamePath"
      :style="maxi ? maxiSize : miniSize"
      class="absolute-center"
      wmode="transparent"
      allowNetworking="internal"
    >

    <webview
      v-else
      :src="game.url"
      :style="maxi ? maxiSize : miniSize"
      class="absolute-center"
      plugins
    />

    <QPageSticky
      v-if="!isProd"
      :offset="[18, 18]"
      position="bottom-right"
    >
      <QBtn
        round
        :icon="`fullscreen${maxi ? '_exit' : ''}`"
        @click="maxi = !maxi"
      />
    </QPageSticky>
  </QPage>
</template>

<script lang="ts">
import { computed, createComponent, value, onMounted } from 'vue-function-api'
import Games from '../store/games'

export default createComponent({
  name: 'PageGame',
  setup (props, { root }) {
    const game = value(Games.getGameById(root.$route.params.slug))
    const maxi = value(!!process.env.PROD)

    const isProd = computed(() => !!process.env.PROD)
    const maxiSize = computed(() => {
      const aspectRatio = game.value.width / game.value.height
      const maxHeight = '100vh - 50px'
      const maxWidth = '100vw'

      return {
        height: `calc(${maxHeight})`,
        maxHeight: `calc(${maxWidth} / ${aspectRatio})`,
        width: `calc((${maxHeight}) * ${aspectRatio})`,
        maxWidth: maxWidth
      }
    })

    const miniSize = computed(() => {
      const aspectRatio = game.value.width / game.value.height
      const miniHeight = 360

      return {
        height: `${miniHeight}px`,
        width: `${miniHeight * aspectRatio}px`
      }
    })

    onMounted(() => {
      Games.setSubtitle(`Now playing "${game.value.title}"`)
    })

    return {
      game,
      maxi,
      isProd,
      maxiSize,
      miniSize
    }
  }
})
</script>
