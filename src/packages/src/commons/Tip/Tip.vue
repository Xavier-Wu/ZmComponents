<template>
<div class="tip-box">
  <slot></slot>
  <el-tooltip v-bind="$attrs" :placement="placement">
    <div slot="content" v-html="content"></div>
    <i class="el-icon-question" :style="iconStyle" :class="iconClass"></i>
  </el-tooltip>
</div>
</template>

<script>
  export default {
    name: 'Tip',
    props: {
      content: {
        type: String,
        default: ''
      },
      placement: {
        type: String,
        default: 'right'
      },
      iconStyle: {
        type: String,
        default: ''
      },
      iconClass: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
.tip-box{
  display: inline-block;
  // padding-right: 34px;
  position: relative;
  width: 100%;
}
.el-icon-question{
  position: absolute;
  font-size: 18px;
  color:#d2d2d2;
  top:7px;
  right: -34px;
  cursor: pointer;
}
</style>
