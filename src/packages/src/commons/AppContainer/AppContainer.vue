<template>
  <div :class="{'app-container':!$route.query.linkIframe, 'no-bg df': hasLeft }">
    <template v-if="$slots.left">
      <div class="left" :style="leftStyle">
        <slot name="left" />
      </div>
      <div class="center flex-one">
        <slot />
      </div>
    </template>
    <template v-else>
      <slot />
    </template>
  </div>
</template>
<script>
export default {
  name: 'AppContainer',
  props: {
    leftWidth: {
      type: Number,
      default: 180
    },
    gutters: {
      type: [String, Number],
      default: '20'
    }
  },
  computed: {
    hasLeft() {
      return this.$slots.left
    },
    leftStyle() {
      return {
        marginRight: this.gutters + 'px',
        width: this.leftWidth + 'px'
      }
    },
    data() {
      return {}
    }
  }
}

// import { Vue, Component, Prop } from 'vue-property-decorator'

// @Component({
//   name: 'AppContainer'
// })
// export default class AppContainer extends Vue {
//   @Prop({ default: 180 }) readonly leftWidth: number | undefined
//   @Prop({ type: [String, Number], default: '20' }) readonly gutters: number | undefined
//   get hasLeft() {
//     return this.$slots.left
//   }
//   get leftStyle() {
//     return {
//       marginRight: this.gutters + 'px',
//       width: this.leftWidth + 'px'
//     }
//   }
// }
</script>
<style lang="scss">
.app-container {
  &.no-bg {
    background-color: transparent;
    padding: 0;
  }
  .center {
    padding: 20px;
  }
  .center,
  .left {
    background: #fff;
  }
}
</style>
