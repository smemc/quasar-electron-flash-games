<template>
  <QCard
    :style="{ width: `${width}px` }"
    @mouseover="showCardTitle = true"
    @mouseleave="showCardTitle = false"
  >
    <QImg
      :ratio="16/10"
      :src="game.coverImage"
    >
      <transition
        appear
        enter-active-class="animated slideInDown"
        leave-active-class="animated slideOutUp"
      >
        <div
          v-if="showCardTitle"
          class="absolute-full"
        >
          <QBtn
            flat
            icon="info"
            color="white"
            class="float-right"
            @click="$router.push(`/info/${game.slug}`)"
          />

          <div class="text-subtitle2">
            {{ game.title }}
          </div>
        </div>
      </transition>
    </QImg>

    <QSeparator/>

    <QCardActions align="center">
      <QBtn
        push
        class="full-width"
        icon="videogame_asset"
        color="positive"
        label="Jogar"
        @click="$router.push(`/game/${game.slug}`)"
      >
        <MaeRemoteBadge v-if="!game.gamePath"/>
      </QBtn>
    </QCardActions>
  </QCard>
</template>

<script lang="ts">
import { createComponent, value } from 'vue-function-api'
import { PropType } from 'vue'
import { Game } from '../store/games/types'
import MaeRemoteBadge from '../components/MaeRemoteBadge.vue'

export default createComponent({
  name: 'GameCard',
  components: {
    MaeRemoteBadge
  },
  props: {
    game: {
      type: Object as PropType<Game>,
      required: true
    },
    width: {
      type: Number,
      required: true
    }
  },
  setup () {
    const showCardTitle = value(false)

    return {
      showCardTitle
    }
  }
})
</script>
