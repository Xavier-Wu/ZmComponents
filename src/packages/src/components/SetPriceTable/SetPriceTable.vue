<!-- setPriceTable 设置价格-->
<template>
  <div class="setPriceTable">
    <el-table :data="getTableData()" border style="width: 100%">
      <el-table-column label="制式\影厅">
        <template slot-scope="scope">{{scope.row.yAxis}}</template>
      </el-table-column>

      <el-table-column v-for="item in getXAxisArray()" :key="item" :label="item">
        <template slot-scope="scope">
          <slot name="input" :row="getPriceValue(scope.row,item)">
            <el-input-number :disabled="disabled" :min="null" class="wp100" :controls="false" :placeholder="placeholder" v-model="getPriceValue(scope.row,item)[xAxisItemValueKey]"></el-input-number>
          </slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/**
 *  传入的 data 格式
 * [{ "copyType":"2D","price":[ {"hallType":"普通厅","money":"30.00" }]
 *
 *
 * */
export default {
  name: 'SetPriceTable',
  props: {
    disabled: {
      type: Boolean,
      default() { return false }
    },
    // x 轴数据 例：'普通厅.超级厅'
    xAxis: {
      type: String
    },
    // y 轴数据  例：'2D,3D'
    yAxis: {
      type: String
    },
    data: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      default: '请填写金额'
    },
    // data 格式的key配置
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
    }
  },
  methods: {
    // 初始化方法
    init() { },
    // 分割x轴数据
    getXAxisArray() {
      const xAxisArray = this.xAxis.split(',').filter(i => i)
      return xAxisArray
    },
    // 分割y轴数据
    getYAxisArray() {
      const yAxisArray = this.yAxis.split(',').filter(i => i)
      return yAxisArray
    },
    // 生成表格数据
    getTableData() {
      const tabelData = this.getYAxisArray().map(i => {
        const item = {
          yAxis: i
        }
        return item
      })
      return tabelData
    },

    getPriceValue(row, xAxis) {
      const item = this.data.find(i => i[this.yAxisKey] === row.yAxis)
      let priceItem
      if (item) {
        priceItem = item[this.xAxisKey].find(i => i[this.xAxisItemTypeKey] === xAxis)
        if (priceItem) {
          return priceItem
        }
      }
      return {}

      /*
      *bug x,y取反了,以下我我做修改了 by lgl
      */
      // const item = this.data.find(i => i[this.yAxisKey] === xAxis)
      // let priceItem
      // if (item) {
      //   priceItem = item[this.xAxisKey].find(i => i[this.xAxisItemTypeKey] === row.yAxis)
      //   if (priceItem) {
      //     return priceItem
      //   }
      // }
      // return {}
    }

  }
}

</script>
<style lang='scss' >
.setPriceTable {
  .el-input__inner {
    border: none !important;
  }
}
</style>
