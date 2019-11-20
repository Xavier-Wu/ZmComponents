<template>
  <el-select clearable remo fitler remo-method multiple v-bind="$attrs" v-on="$listeners" v-model="value1">
    <el-option :label="item[labelKey]" :value="item[valueKey]+''" v-for="item in options" :key="item[valueKey]" :disabled="item.disabled" @click.native="changeFun(item.value)">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'RemoteSelectMultiple',
  props: {
    action: String,
    query: Object,
    labelKey: {
      type: String,
      default: 'name'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    dictKey: String,
    showAllOption: { // 是否有全部
      type: Boolean,
      default: false
    },
    value: Array
  },
  data () {
    return {
      isDisabled: false,
      options: [],
      value1: [],
      currentData: {},
      needShowAllOption: this.showAllOption
    }
  },
  watch: {
    /* value(val) {
      if (val.length === 0) {
        this.options.map(e => {
          e.disabled = false
        })
      } else {
        if (val.join(',').indexOf('-1') > -1) {
          this.$set(this, 'value1', ['-1'])
          console.log(this.value1)
          this.options.map(e => {
            if (e.value === '-1') {
              e.disabled = false
            } else {
              e.disabled = true
            }
          })
        } else {
          this.value1 = val*/
    /* val.forEach(e => {
if (e === '-1') {
this.value1 = ['-1']
return false
} else {
this.options.map(e => {
e.disabled = false
})
}
})*/
    //     }
    //   }
    // },
    value1 (val) {
      if (val.length === 0) {
        this.options.map(e => {
          e.disabled = false
        })
      }
      this.$emit('change-data', val, this.options.find(e => e[this.valueKey] === val))
      this.$emit('input', val)
    },
    dictKey (val) {
      this.fetchOptions()
    },
    options () {
      this.$emit('change-data', this.value1, this.options.find(e => e[this.valueKey] === this.value1))
    }
  },
  created () {
    if (this.value) {
      this.value1 = this.value
    }
    this.fetchOptions()
  },
  methods: {
    mergeArray (arr1, arr2, prop = 'value') {
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          if (prop) {
            if (arr1[i]) {
              if (arr1[i][prop] === arr2[j][prop]) {
                arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
              }
            }
          } else {
            if (arr1[i] === arr2[j]) {
              arr1.splice(i, 1) // 利用splice函数删除元素，从第i个位置，截取长度为1的元素
            }
          }
        }
      }
      for (let i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i])
      }
      return arr1
    },
    async fetchOptions () {
      if (this.dictKey) {
        this.options = await this.$request.get('/v1/common/getLabelList', { params: { type: this.dictKey } })

        this.$emit('after-action', this.options)
      } else if (this.action) {
        let params = {}
        if (this.query) { params = this.query }
        this.needShowAllOption ? this.options.unshift({ 'name': '全部', 'value': '-1' }) : ''
        this.options = this.mergeArray(this.options, await this.$request.get(this.action, { params: params }))
        if (this.value.includes('-1')) {
          this.options.forEach(e => {
            if (e.value === '-1') {
              e.disabled = false
            } else {
              e.disabled = true
            }
          })
        } else {
          this.options.forEach(e => {
            e.disabled = false
          })
        }
        this.$emit('after-action', this.options)
      }
      // if (this.value) { this.value1 = this.value + '' }
    },
    changeFun (val, event) {
      if (this.value1.includes('-1')) {
        this.value1 = ['-1']
        this.$emit('change-data', this.value, ['-1'])
        this.options.map(e => {
          if (e.value === '-1') {
            e.disabled = false
          } else {
            e.disabled = true
          }
        })
      } else {
        this.value1.forEach(e => {
          if (e === '-1') {
            this.value1 = ['-1']
            return false
          } else {
            this.options.map(e => {
              e.disabled = false
            })
          }
        })
      }
    },
    selectAll () {
    }
  }
}
</script>

<style scoped>
</style>
