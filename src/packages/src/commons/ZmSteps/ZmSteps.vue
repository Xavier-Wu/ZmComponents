<!-- 步骤条 -->
<template>
  <div class="steps-box">
    <el-steps :active="+value" align-center>
      <el-step v-for="item in list" :key="item" :title="item"></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  name: 'ZmSteps',
  props: {
    value: {
      type: [Number, String],
      defalut: 0
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {}
}
</script>
<style lang="scss">
.steps-box {
  margin-top: 10px;
  margin-bottom: 20px;

  .el-step__head.is-process {
    color: #666;
    border-color: #666;
  }
  .el-step__title.is-process {
    color: #666;
  }
  .el-step__title {
    font-size: 15px;
  }
}
</style>
