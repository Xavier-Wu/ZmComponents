
<template>
  <el-tabs :stretch="stretch" v-model="activeName" :type="type" @tab-click="handleClick" :lazy="lazy">
    <el-tab-pane v-for="(item,index) in list" :key="index" :label="item[labelKey]" :name="item[valueKey]">
      <slot v-if="item[valueKey] === activeName"></slot>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: 'ZmTabs',
  components: {},
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: String,
      default () {
        return this.list && this.list.length && this.list[0][this.valueKey]
      }
    },
    stretch: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: ''
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data () {
    return {}
  },
  computed: {
    activeName: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {},
  created () { },
  methods: {
    handleClick (tab, e) {
      this.$emit('click', tab, e)
    }
  }
}
</script>
