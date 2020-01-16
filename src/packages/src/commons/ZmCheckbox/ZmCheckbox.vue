<template>
  <div :class="checkOption.borderClass||{checkboxBorder:checkOption.isBorder}">
    <el-checkbox
      :disabled="disabled"
      v-model="chooseInfo.isAll"
      :indeterminate="chooseInfo.indeterminate"
      @change="changeCheckbox('all',chooseInfo)"
      v-if="checkOption.isAllShow"
    >{{checkOption.allKey}}</el-checkbox>
    <el-checkbox-group
      :min="+checkOption.min"
      :max="+checkOption.max||list.length"
      :disabled="disabled"
      v-model="checkValue"
      :class="checkOption.groupClass"
    >
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
        min: '', // 最小勾选个数
        max: '', // 最大勾选个数
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
    option: {
      handler() {
        this.checkOption = Object.assign(
          {},
          { ...this.checkOption },
          this.option
        )
      },
      deep: true
    },
    value(val) {
      // 回填时，因为外部传入的是字符串或者数组，而内部为数组，所以数据类型不同时会造成死循环
      // 使用该方法或不在回填的同时往外回传值可以防止死循环
      const modelVal = Array.isArray(val) ? val : val.split(',')
      if (JSON.stringify(modelVal) !== JSON.stringify(this.checkValue)) {
        this.getValue(val)
      }
    },
    list: {
      // 有可选子集时，外部传入可选列表时，需要判断是否初始全选，如果全选则执行一次全选操作，如果无可选子集在回填中判断
      handler(val) {
        if (val && val.length && this.checkOption.isAll) {
          this.chooseInfo.isAll = this.checkOption.isAll
          this.changeCheckbox('all', this.chooseInfo)
        }
        this.changeList()
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
    this.getValue(this.value)
  },
  methods: {
    // list被动态删减时，重新对比已选值，如果已选值中有不在list中的就删除，并回传新的value值和设置新的全选状态
    changeList() {
      console.log('changeList', this.checkValue, this.list)
      this.checkValue &&
        this.checkValue.length &&
        this.checkValue.forEach((e, index) => {
          const listIds =
            this.list && this.list.length
              ? this.list.map(e => e[this.labelKey])
              : []
          if (!listIds.includes(e)) this.checkValue.splice(index, 1)
        })
      this.changeCheckbox('one', this.chooseInfo)
    },
    getValue(value) {
      // 默认传入值为字符串，如果需要数组传入的情况也做接收判断
      this.checkValue =
        value && value.length
          ? typeof value === 'string'
            ? value.split(',').filter(e => e)
            : value
          : []
      // 回填时获取全选状态，可不回传数据
      this.changeCheckbox('one', this.chooseInfo, true)
    },
    // 选择终端
    changeCheckbox(type, item, noInput) {
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
          item.isAll = deviceLen !== 0 && deviceLen === ids.length
          item.indeterminate = deviceLen > 0 && deviceLen < ids.length
          break
      }
      const choosed = []
      this.checkValue.forEach(e => {
        const checkValue = this.list.filter(f => +f[this.labelKey] === +e)
        if (checkValue && checkValue.length) choosed.push(checkValue[0])
      })
      if (!noInput) {
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
      }
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
