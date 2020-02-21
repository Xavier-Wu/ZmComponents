<template>
  <el-button v-bind="$attrs" @click.prevent="handleClick">
      <slot/>
  </el-button>
</template>

<script>
export default {
  name: 'ZmButton',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
};
</script>
