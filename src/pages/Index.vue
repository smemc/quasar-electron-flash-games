<template>
  <QPage>
    <div class="absolute-full row">
      <div class="col-auto">
        <MaeSideMenu/>
      </div>

      <div class="col column">
        <QScrollArea class="fit">
          <div class="q-pa-md row justify-around items-stretch q-gutter-md">
            <MaeGameCard
              v-for="game in filteredGames"
              :key="game.slug"
              class="q-ma-sm"
              :game="game"
              :width="cardWidth"
            />
          </div>
        </QScrollArea>
      </div>
    </div>
  </QPage>
</template>

<script lang="ts">
import {
  createComponent,
  onMounted,
  onUpdated,
  value,
  computed
} from 'vue-function-api'
import Games from '../store/games'
import { translateCategory } from '../store/utils/functions'
import MaeGameCard from '../components/MaeGameCard.vue'
import MaeSideMenu from '../components/MaeSideMenu.vue'

export default createComponent({
  name: 'PageIndex',
  components: {
    MaeGameCard,
    MaeSideMenu
  },
  setup () {
    const cardWidth = value(180)

    const games = computed(() => Games.games)
    const filteredGames = computed(() => Games.filteredGames)

    const updateSubtitle = () => {
      Games.setSubtitle(
        `Atividades selecionadas: ${Games.filteredGames.length} de ${Games.games.length}`
      )
    }

    onMounted(updateSubtitle)
    onUpdated(updateSubtitle)

    return {
      cardWidth,
      updateSubtitle,
      games,
      filteredGames,
      translateCategory
    }
  }
})
</script>
