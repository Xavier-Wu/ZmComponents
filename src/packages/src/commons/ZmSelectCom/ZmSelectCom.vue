<!-- ZmSelectCom -->
<template>
  <el-select
    v-bind="$attrs"
    v-on="$listeners"
    :placeholder="placeholder"
    v-model="Value"
    :disabled="disabled"
    :clearable="clearable"
    :readonly="readonly"
    :filterable="filterable"
  >
    <el-option v-if="hasNull" :label="placeholder" value></el-option>
    <el-option
      v-for="item in list"
      :key="item[valueKey]"
      :label="item[labelKey]"
      :value="item[valueKey]"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ZmSelectCom',
  props: {
    // 是否出现请选择
    hasNull: {
      type: Boolean,
      default: true
    },
    value: {
      type: String | Number,
      required: true
    },
    disabled: Boolean,
    readonly: Boolean,
    placeholder: {
      type: String,
      default: '请选择'
    },
    type: {
      type: String,
      default: 'text'
    },
    // 可搜索
    filterable: {
      type: Boolean,
      default: true
    },
    // 可清空
    clearable: {
      type: Boolean,
      default: true
    },

    // 列表数据
    list: {
      type: Array,
      required: true
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
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
    init() {}
  }
}
</script>
<style lang='scss' scoped>
</style>
