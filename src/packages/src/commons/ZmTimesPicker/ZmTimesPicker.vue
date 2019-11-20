<!-- zmTimesPicker  选择开始时间 结束时间 -->
<template>
    <el-time-picker v-if="!loading" class="zmTimesPicker" @change="change" is-range v-model="Value" :value-format="format" :format="format" :range-separator="rangeSeparator" :start-placeholder="startPlaceholder" :end-placeholder="endPlaceholder" placeholder="选择时间范围">
    </el-time-picker>
</template>

<script>
export default {
  name: 'ZmTimesPicker',
  props: {
    value: {
      type: Array

    },
    // .sync 双向绑定
    startTime: {
      type: [Date, String],
       default: ''
    },
    // .sync 双向绑定
    endTime: {
      type: [Date, String],
      default: ''
    },
    format: {
      type: String,
      default: 'HH:mm:ss'
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    }

  },

  data() {
    return {
      loading: true,
      Value: []
    }
  },
  mounted() {
    this.init()
  },

  methods: {
    // 初始化方法
    init() {
      this.initData()
    },
    initData() {
      this.loading = true
      if (this.value) {
        this.Value = this.value
      } else {
        this.Value = [this.startTime, this.endTime]
      }
      // console.log(this.value)
       this.loading = false
    },
    change(v) {
      // console.log(v, '改变')
      if (!v) {
        v = []
      }
      this.$emit('input', v)
      this.$emit('change', v)
      this.$emit('update:startTime', v[0])
      this.$emit('update:endTime', v[1])
    }
  }
}

</script>
<style lang='scss' >
.zmTimesPicker {
  .el-range-separator {
    width: 20px;
  }
}
</style>
