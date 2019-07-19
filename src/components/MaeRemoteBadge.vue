<template functional>
  <QBadge
    floating
    color="negative"
  >
    <QIcon
      name="public"
      :size="`${size}px`"
    />
  </QBadge>
</template>

<script lang="ts">
export default {
  name: 'MaeRemoteBadge',
  functional: true,
  props: {
    size: {
      type: Number,
      default: 20
    }
  }
}
</script>
