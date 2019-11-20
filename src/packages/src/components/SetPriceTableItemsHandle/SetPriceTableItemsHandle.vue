<!-- SetPriceTableItemsHandle 有增删改的 价格设置 -->
<template>
  <zm-collapse-form :more="more" :title="title" :rules="rules" @click-add="handleAdd" :auto-add="true">
    <div slot-scope="scope">
      <slot :row="scope.row"></slot>
      <set-price-table-items :keys="keys" :data="scope.row" :axis-valuel-key="axisValuelKey" :all-y-axis="allYAxis" :all-x-axis="allXAxis" :x-axis="xAxis" :y-axis="yAxis" :y-axis-key="yAxisKey" :x-axis-key="xAxisKey" :x-axis-item-type-key="xAxisItemTypeKey" :x-axis-item-value-key="xAxisItemValueKey" :placeholder="placeholder" :disabled="disabled" />
    </div>
  </zm-collapse-form>
</template>

<script>
import SetPriceTableItems from '../SetPriceTableItems'
import ZmCollapseForm from '../../commons/ZmCollapseForm'
export default {
  name: 'SetPriceTableItemsHandle',
  components: { SetPriceTableItems, ZmCollapseForm },
  props: {
    more: {
      type: Boolean,
      default: () => { return true }

    },
    title: {
      type: String,
      default: '特殊方案规则'
    },
    // 结算类型 1、最低价增加 2、最低价减少 3、固定价 4、按票务系统商结算
    settlementType: {
      type: String,
      default: ''
    },

    rules: {
      type: Array,
      required: true
    },
    // 全部 x轴 y轴的 数组对象 value的key
    axisValuelKey: {
      type: String,
      default: 'value'
    },

    // 以下是 组件 SetPriceTableItems 参数 配置
    // 全部的x轴数据。生成数据用 格式 :[{value:'普通厅'}]
    allXAxis: {
      type: Array,
      required: true
    },
    // 全部的y轴数据。生成数据用 格式 :[{value:'2d'}]
    allYAxis: {
      type: Array,
      required: true
    },

    // 以下是 组件 SetPriceTable 参数 配置
    disabled: {
      type: Boolean,
      default() { return false }
    },
    xAxis: {
      type: String,
      required: true
    },
    yAxis: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: '请填写金额'
    },
    yAxisKey: {
      type: String,
      default: 'copyType'
    },
    xAxisKey: {
      type: String,
      default: 'price'
    },
    xAxisItemTypeKey: {
      type: String,
      default: 'hallType'
    },
    xAxisItemValueKey: {
      type: String,
      default: 'money'
    }

  },
  data() {
    return {
      collapseActive: 0,
      sortLoading: false, // 刷新时间组件用
      item: {
        startTime: '',
        endTime: ''
      }
    }
  },

  computed: {
     keys() {
       return this.createdKeys()
     }
  },

  mounted() {

  },
  methods: {
    // 初始化方法

    handleAdd(rules) {
      console.log(rules, 'handleAdd')
      const item = { ...this.item }
      rules.push(item)
    },

    createdKeys() {
      const keys = [
        { label: '结算价格', value: 'settlePriceRule', placeholder: '请填写结算金额' },
        { label: '影院服务费', value: 'servicePriceRule', placeholder: '请填写影院服务费', noChange: true }
      ]
      let placeholder = ''
      if (this.settlementType === '1') {
        placeholder = '请填写增加金额'
      } else if (this.settlementType === '2') {
          placeholder = '请填写减少金额'
      }
      if (placeholder) {
        keys.forEach(i => {
          if (!i.noChange) {
             i.placeholder = placeholder
          }
          })
      }
     return keys
    }

  }
}

</script>

