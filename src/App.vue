<template>
  <div id="q-app">
    <RouterView/>
  </div>
</template>

<script lang="ts">
import { createComponent, onCreated } from 'vue-function-api'
import Games from './store/games'

export default createComponent({
  name: 'App',
  setup () {
    onCreated(() => Games.init())
  }
})
</script>
