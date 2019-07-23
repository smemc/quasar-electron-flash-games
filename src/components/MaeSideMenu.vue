<template>
  <QList class="fit">
    <div class="column fit">
      <div class="col-auto">
        <QItem class="justify-center">
          <QPagination
            v-model="currentPage"
            :max="lastPage"
            :max-pages="5"
            boundary-links
            direction-links
          />
        </QItem>

        <QItem>
          <QToggle
            v-model="showRemoteGames"
            label="Show online games"
          />
        </QItem>

        <QItem>
          <QBtn
            class="full-width"
            push
            color="negative"
            icon="clear"
            label="Limpar seleção"
            @click="selectedKeywords = []"
          />
        </QItem>
      </div>

      <div class="col column">
        <div class="col">
          <QScrollArea class="fit">
            <template v-for="category in categories">
              <QItemLabel
                :key="category"
                header
              >
                {{ category }}
              </QItemLabel>

              <QItem
                v-for="keyword in keywords[category]"
                :key="`${category}.${keyword}`"
                tag="label"
              >
                <QItemSection
                  side
                  top
                >
                  <QCheckbox
                    v-model="selectedKeywords"
                    :val="keyword"
                  />
                </QItemSection>

                <QItemSection>
                  <QItemLabel>{{ keyword }}</QItemLabel>
                </QItemSection>
              </QItem>
            </template>
          </QScrollArea>
        </div>
      </div>
    </div>
  </QList>
</template>

<script lang="ts">
import { computed, createComponent } from 'vue-function-api'
import Games from '../store/games'

export default createComponent({
  name: 'MaeSideMenu',
  setup () {
    const categories = computed(() => Games.categories)
    const keywords = computed(() => Games.keywords)
    const showRemoteGames = computed(
      () => Games.showRemoteGames,
      value => Games.setShowRemoteGames(value)
    )
    const selectedKeywords = computed(
      () => Games.selectedKeywords,
      value => Games.selectKeywords(value)
    )
    const currentPage = computed(
      () => Games.currentPage,
      value => Games.setCurrentPage(value)
    )
    const perPage = computed(
      () => Games.perPage,
      value => Games.setPerPage(value)
    )
    const lastPage = computed(() => Games.lastPage)

    return {
      categories,
      keywords,
      showRemoteGames,
      selectedKeywords,
      currentPage,
      perPage,
      lastPage
    }
  }
})
</script>
