<template>
  <div :class="checkOption.borderClass||{checkboxBorder:checkOption.isBorder}">
    <el-checkbox
      :disabled="disabled"
      v-model="chooseInfo.isAll"
      :indeterminate="chooseInfo.indeterminate"
      @change="changeCheckbox('all',chooseInfo)"
      v-if="checkOption.isAllShow"
    >
{{checkOption.allKey}}
</el-checkbox>
    <el-checkbox-group :disabled="disabled" v-model="checkValue" :class="checkOption.groupClass">
      <el-checkbox
        :class="checkOption.checkboxClass"
        v-for="(item,index) in list"
        :key="index"
        :label="item[labelKey]"
        @change="changeCheckbox('one',chooseInfo)"
      >
        <slot :item="item" v-if="checkOption.isSlot"></slot>
        <span v-else>{{item[nameKey]}}</span>
      </el-checkbox>
    </el-checkbox-group>
  </div>
  <!-- :class="item.content?'mr10':''" -->
</template>
<script>
export default {
  name: 'ZmCheckbox',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Array],
      default: ''
    },
    labelKey: {
      type: String,
      default: 'value'
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      checkValue: [],
      checkOption: {
        borderClass: '', // 配置边框样式
        isBorder: false, // 是否配置默认边框
        groupClass: '', // 配置组样式
        checkboxClass: '', // 配置选项样式
        allKey: '全部', // 配置全选的值
        isString: true, // 设置是否字符串返回
        isSlot: false, // 是否使用插槽配置
        isAllShow: true, // 是否展示全选按钮
        isAll: false // 是否初始全选
      },
      chooseInfo: {
        isAll: false,
        indeterminate: false
      },
      isBackfill: false
    }
  },
  watch: {
    value(val) {
      if (!(val && val.length)) this.checkValue = []
      // 只回填一次
      if (val && val.length && !this.isBackfill) {
        this.getVlaue(val)
        this.isBackfill = true
      }
    },
    list: {
      // 有可选子集时，外部传入可选列表时，需要判断是否初始全选，如果全选则执行一次全选操作，如果无可选子集在回填中判断
      handler(val) {
        if (val && val.length && this.checkOption.isAll) {
          this.chooseInfo.isAll = this.checkOption.isAll
          this.changeCheckbox('all', this.chooseInfo)
        }
      },
      deep: true
    },
    // list不变化，但是需要回填全选时，获取全选状态
    'checkOption.isAll': {
      handler(val) {
        if (val) {
          this.chooseInfo.isAll = val
          this.changeCheckbox('all', this.chooseInfo)
        }
      }
    }
  },

  mounted() {
    this.checkOption = Object.assign({}, { ...this.checkOption }, this.option)
    // 多次销毁再打开时，重复回填使用
    this.getVlaue(this.value)
  },
  methods: {
    getVlaue(value) {
      // 默认传入值为字符串，如果需要数组传入的情况也做接收判断
      this.checkValue =
        value && value.length
          ? typeof value === 'string'
            ? value.split(',').filter(e => e)
            : value
          : []
      // 回填时获取全选状态
      if (this.checkValue && this.checkValue.length) {
        this.changeCheckbox('one', this.chooseInfo)
      }
    },
    // 选择终端
    changeCheckbox(type, item) {
      const ids = this.list.map(e => {
        return e[this.labelKey]
      })
      const deviceLen = this.checkValue.length
      switch (type) {
        case 'all':
          this.checkValue = item.isAll ? ids : []
          item.indeterminate = false
          break
        case 'one':
          item.isAll = deviceLen === ids.length
          item.indeterminate = deviceLen > 0 && deviceLen < ids.length
          break
      }
      const choosed = this.list.filter(e => {
        return this.checkValue.includes(e[this.labelKey])
      })
      this.$emit(
        'input',
        this.checkValue.length
          ? this.checkOption.isString
            ? this.checkValue.join(',')
            : this.checkValue
          : this.checkOption.isString
          ? ''
          : []
      )
      // 返回全选状态
      this.$emit('change-choose', { choosed, chooseInfo: this.chooseInfo })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  margin-left: 0;
  &:not(:last-child) {
    margin-right: 30px;
  }
}
.checkboxBorder {
  border: 1px solid #ebeef5;
  padding: 10px;
}
</style>
