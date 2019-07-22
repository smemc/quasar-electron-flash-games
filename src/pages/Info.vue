<template>
  <QPage>
    <div class="absolute-full row">
      <div class="col column">
        <div class="col-auto text-center">
          <h2>{{ game.title }}</h2>

          <p>
            <template v-for="(keywords, category) in game.keywords">
              <QChip
                v-for="(keyword, index) in keywords"
                :key="`${category}/${index}`"
                class="q-mx-sm"
              >
                {{ category }}: {{ keyword }}
              </QChip>
            </template>
          </p>
        </div>

        <div class="col">
          <QScrollArea class="fit">
            <div class="row q-px-md q-gutter-md">
              <div
                v-if="game.screenshots"
                class="col"
              >
                <QCarousel
                  v-model="slide"
                  control-color="white"
                  transition-prev="jump-right"
                  transition-next="jump-left"
                  animated
                  arrows
                  thumbnails
                  infinite
                  autoplay
                >
                  <QCarouselSlide
                    v-for="(screenshot, key) in game.screenshots"
                    :key="key"
                    :name="key"
                    :img-src="screenshot"
                  />
                </QCarousel>
              </div>

              <div class="col text-justify">
                <p
                  v-for="(paragraph, index) in game.description"
                  :key="index"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </QScrollArea>
        </div>
      </div>

      <QPageSticky
        :offset="[18, 18]"
        position="bottom-right"
      >
        <QBtn
          push
          round
          color="positive"
          size="xl"
          icon="videogame_asset"
          @click="$router.push(`/game/${$route.params.slug}`)"
        >
          <MaeRemoteBadge v-if="isRemote"/>
        </QBtn>
      </QPageSticky>
    </div>
  </QPage>
</template>

<script lang="ts">
import { computed, createComponent, onMounted, value } from 'vue-function-api'
import Games from '../store/games'
import MaeRemoteBadge from '../components/MaeRemoteBadge.vue'

export default createComponent({
  name: 'PageInfo',
  components: {
    MaeRemoteBadge
  },
  setup (props, { root }) {
    const game = value(Games.getGameById(root.$route.params.slug))
    const slide = value(0)

    const isRemote = computed(() => !game.value.gamePath)

    onMounted(() => {
      Games.setSubtitle(`Info about game "${game.value.title}"`)
    })

    return {
      game,
      slide,
      isRemote
    }
  }
})
</script>
