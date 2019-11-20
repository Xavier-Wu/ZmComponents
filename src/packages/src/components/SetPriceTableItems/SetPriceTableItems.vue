<!-- SetPriceTableItems 用来设置多个表格价格 -->
<template>
  <div>
    <div v-for="(item,index) in keys" :key="index" v-if="!loading">
      <el-form-item :label="item.label">
        <set-price-table :placeholder="item.placeholder" :disabled="disabled" :data="data[item.value]" :y-axis-key="yAxisKey" :x-axis-key="xAxisKey" :x-axis-item-type-key="xAxisItemTypeKey" :x-axis-item-value-key="xAxisItemValueKey" :x-axis="xAxis" :y-axis="yAxis" />
      </el-form-item>
    </div>
  </div>
</template>

<script>
/**
 * @param data
 * data:{
 * settlePriceRule":[ { "copyType":"2D","price":[  { "hallType":"normal", "money":"30.00" } ]}],
   servicePriceRule":[{"copyType":"2D","price":[{ "hallType":"normal","money":"30.00" } ]
   }
 *
 *
*/
import SetPriceTable from '../SetPriceTable'
export default {
  name: 'SetPriceTableItems',
  components: { SetPriceTable },
  props: {
    // 用来配置多个表格
    keys: {
      type: Array,
      default() { return [{ label: '结算价格', value: 'settlePriceRule', placeholder: '请填写结算金额' }, { label: '影院服务费', value: 'servicePriceRule', placeholder: '请填写影院服务费' }] }
    },
    data: {
      type: Object,
      required: true
    },
    // 全部 x轴 y轴的 数组对象 value的key
    axisValuelKey: {
      type: String,
      default: 'value'
    },
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
      loading: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化方法
    init() {
      this.initeRule()
    },

    // 生成规则 rule
    /** *
     * @param targer 编辑时的源数据
    */
    createRuleItem(targer = []) {
      const allYAxis = this.allYAxis
      const allXAxis = this.allXAxis
      const ruleItem = allYAxis.map(y => {
        const item = {
          [this.yAxisKey]: y[this.axisValuelKey],
          [this.xAxisKey]: allXAxis.map(x => {
            const xItem = {
              [this.xAxisItemTypeKey]: x[this.axisValuelKey],
              [this.xAxisItemValueKey]: this.getRulePrice(targer, y[this.axisValuelKey], x[this.axisValuelKey])
            }
            return xItem
          })

        }
        return item
      })

      return ruleItem
    },

    // 获取已有数据值
    getRulePrice(targer = [], yValue, xValue) {
      if (!targer.length) {
        return ''
      }
      const _targer = [...targer]
      const item = _targer.find(i => i[this.yAxisKey] === yValue)
      if (item) {
        const priceItem = item[this.xAxisKey].find(i => i[this.xAxisItemTypeKey] === xValue) || {}
        return priceItem[this.xAxisItemValueKey] || ''
      }
      return ''
    },

    // 初始化规则
    initeRule() {
      this.keys.forEach(item => {
        const key = item.value
        const rule = this.createRuleItem(this.data[key])
        this.data[key] = [...rule]
      })
      this.$nextTick(() => {
        this.loading = false
      })
    }

  }
}

</script>
<style lang='scss' scoped>
</style>
