<!-- SelectDateTime 选择日期 跟开始结束时间 -->
<template>
  <div class="df-center">
      <zm-date-picker-one v-if="hasDate" class="w150 mr10" v-model="Data[dateKey]"></zm-date-picker-one>
      <zm-times-picker style="width:260px" :start-time.sync="Data[startTimeKey]" :end-time.sync="Data[endTimeKey]" />
</div>
</template>

<script>
/**
 * data 默认 格式 {date:'',startTimeKey:'',endTimeKey:''}
 */
export default {
  name: 'SelectDateTime',
  props: {
    hasDate: {
      type: Boolean,
      default: true
    },
    data: {
      type: Object,
       required: true
    },
    dateKey: {
      type: String,
      default: 'date'
    },
    startTimeKey: {
       type: String,
       default: 'startTime'
    },
    endTimeKey: {
       type: String,
       default: 'endTime'
    }

  },
  data() {
    return {
      Data: this.data

    }
  },
  methods: {
    // 初始化方法
    init() { }

  }
}

</script>
<style lang='scss' scoped>
</style>
