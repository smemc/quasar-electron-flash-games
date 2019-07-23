<template>
  <QList class="fit">
    <div class="column fit">
      <div class="col-auto">
        <QItem>
          <QToggle
            v-model="localOnly"
            label="Ocultar atividades online"
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
    const localOnly = computed(
      () => Games.localOnly,
      value => Games.setLocalOnly(value)
    )
    const selectedKeywords = computed(
      () => Games.selectedKeywords,
      value => Games.selectKeywords(value)
    )

    return {
      categories,
      keywords,
      localOnly,
      selectedKeywords
    }
  }
})
</script>
