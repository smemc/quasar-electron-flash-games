<template>
  <div id="q-app">
    <RouterView/>
  </div>
</template>

<script lang="ts">
import { createComponent } from 'vue-function-api'

export default createComponent({
  name: 'App'
})
</script>
