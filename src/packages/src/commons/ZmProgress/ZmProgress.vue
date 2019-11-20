<!-- 步骤条 -->
<template>
  <el-progress :percentage="percentage" :color="customColors"></el-progress>
</template>
<script>
/*
 ** 需要关闭时外部调用isOver方法进行关闭，否则进度条到95时自动关闭并提示超时
 **
 */
export default {
  name: 'ZmProgress',
  props: {
    value: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      timer: () => {},
      overTime: () => {},
      percentage: 0,
      customColors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  created() {
    this.begin()
  },
  methods: {
    begin() {
      this.timer = setInterval(() => {
        console.log('timer', this.percentage)
        this.percentage++
        // 先直接到85，然后判断外部是否调用isOver，有则直接到100关闭，否则等待10秒后关闭
        if (this.percentage >= 85) {
          clearInterval(this.timer)
          this.overTime = setInterval(() => {
            console.log('overTime', this.percentage)
            this.percentage++
            if (this.percentage >= 95) {
              this.$message.error('等待超时！')
              this.$emit('input', false)
              clearInterval(this.overTime)
            }
          }, 1000)
        }
      }, 40)
    },
    isOver(val) {
      if (val) this.percentage = 100
      clearInterval(this.timer)
      clearInterval(this.overTime)
      this.$emit('input', false)
    }
  }
}
</script>
