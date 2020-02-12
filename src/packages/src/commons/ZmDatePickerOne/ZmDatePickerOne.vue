<!-- ZmDatePickerOne 单个日期选择 -->
<template>
  <el-date-picker
    :value-format="valueFormat"
    v-model="Value"
    :type="type"
    :disabled="disabled"
    :readonly="readonly"
    :placeholder="placeholder"
    :clearable="clearable"
    v-bind="$attrs"
    v-on="$listeners"
    @change="change"
  ></el-date-picker>
</template>

<script>
export default {
  name: 'ZmDatePickerOne',
  props: {
    value: {
      type: String | Number,
      required: true
    },
    valueFormat: {
      default: 'yyyy-MM-dd'
    },
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: Boolean,
    readonly: Boolean,
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },

  computed: {
    Value: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  methods: {
    // 初始化方法
    init() {},
    change(v) {
      this.$emit('change', v)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
