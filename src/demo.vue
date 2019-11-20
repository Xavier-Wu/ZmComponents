<template>
  <div>
    This is demo.
  </div>
</template>

<script>
export default {
  created() {
    this.$onBus('index.list', () => {
      console.log('onBus: ' + arguments)
    })
  }
}
</script>
