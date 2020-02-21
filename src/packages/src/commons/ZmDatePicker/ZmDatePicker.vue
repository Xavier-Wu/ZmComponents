<template>
  <div class="content-item">
    <div class="button-item vm" :class="{mr20:showRadio}">
      <el-date-picker :class="dateClass||'w400'" v-model="queryParams.joinTime" align="right" :type="type" :disabled="disabled" :range-separator="rangeSeparator" :value-format="type | valueFormat" :format="type | valueFormat" v-bind="$attrs" v-on="$listeners" :default-time="['00:00:00', '23:59:59']" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels @change="changeDateRange"></el-date-picker>
    </div>
    <el-radio-group v-model="queryParams.dateType" @change="changeTimeType" class="vm" v-if="showRadio">
      <el-radio-button v-for="(item,index) in realDateTypeList" :key="index" :label="item.label">
        {{item.name}}
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script>
import { getData } from '../../utils/date'
export default {
  name: 'ZmDatePicker',
  filters: {
    valueFormat (v) {
      if (['datetimerange'].includes(v)) {
        return 'yyyy-MM-dd HH:mm:ss'
      }
      if (['daterange'].includes(v)) {
        return 'yyyy-MM-dd'
      }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    rangeSeparator: {
      type: String,
      default: '至'
    },
    dateClass: {
      type: String,
      default: ''
    },
    defaultChooseType: {
      type: Array,
      default () {
        return ['today', 'yesterday', 'prve7Days', 'prve30Days']
      }
    },
    showRadio: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'datetimerange'
    },
    startDate: {
      type: [Date, String],
      default: ''
    },
    endDate: {
      type: [Date, String],
      default: ''
    },
    defaultDateType: {
      type: String,
      default: 'today'
    }

  },
  data () {
    return {
      queryParams: {
        dateType: 'today',
        joinTime: []
      },
      dateTypeList: [
        {
          label: 'today',
          name: '今日'
        },
        {
          label: 'yesterday',
          name: '昨天'
        },
        {
          label: 'prve7Days',
          name: '近7天'
        },
        {
          label: 'prve30Days',
          name: '近30天'
        },
        {
          label: 'nowWeek',
          name: '本周'
        },
        {
          label: 'prveWeek',
          name: '上周'
        },
        {
          label: 'nowMonth',
          name: '本月'
        },
        {
          label: 'prveMonth',
          name: '上月'
        },
        {
          label: 'nowYear',
          name: '本年'
        },
        {
          label: 'prveYear',
          name: '上年'
        },
        {
          label: 'all',
          name: '全部'
        }
      ]
    }
  },
  computed: {
    realDateTypeList () {
      const realDateTypeList = []
      this.dateTypeList.forEach(e => {
        if (this.getShowType(e.label)) realDateTypeList.push(e)
      })
      return realDateTypeList
    }
  },
  watch: {
    'queryParams.joinTime': {
      handler (value) {
        const isArr = value instanceof Array
        this.$emit('update:startDate', isArr ? value[0] : '')
        this.$emit('update:endDate', isArr ? value[1] : '')
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.queryParams.dateType = this.showRadio ? this.defaultChooseType[0] : ''
    this.changeTimeType(this.queryParams.dateType)
    this.initTime()
  },
  methods: {
    cleanTime () {
      this.queryParams.joinTime = []
      this.queryParams.dateType = this.defaultDateType
      this.$emit('on-change', this.queryParams)
    },
    initTime () {
      const type = this.type
      if (['datetimerange', 'daterange'].includes(type)) {
        if (this.startDate) {
          this.queryParams.joinTime = [this.startDate, this.endDate]
        }
      }
      if (['date'].includes(type)) {
        this.queryParams.joinTime = this.startDate
      }
    },
    changeDateRange (val) {
      if (!val) {
        this.queryParams.dateType = val ? '' : 'all'
        this.queryParams.joinTime = val || []
      }
      this.$emit('on-change', this.queryParams)
    },
    changeTimeType (val) {
      this.chooseTimeType(val)
      this.$emit('on-change', this.queryParams)
    },
    // 获取需要展示的选项类型
    getShowType (type) {
      const index = this.defaultChooseType.findIndex(e => e === type)
      return index !== -1
    },
    chooseTimeType (val) {
      const time = new Date()
      const Year = time.getFullYear()
      let startTime = ''
      let endTime = ''
      switch (val) {
        case 'today':
          startTime = getData('today')
          endTime = getData('today')
          break
        case 'yesterday':
          startTime = getData('yesterday')
          endTime = getData('yesterday')
          break
        case 'nowWeek':
          startTime = getData('nowWeekStart')
          endTime = getData('nowWeekEnd')
          break
        case 'prveWeek':
          startTime = getData('prveWeekStart')
          endTime = getData('prveWeekEnd')
          break
        case 'prve7Days':
          startTime = getData('prve7Days')
          endTime = getData('today')
          break
        case 'prve30Days':
          startTime = getData('prve30Days')
          endTime = getData('today')
          break
        case 'nowMonth':
          startTime = getData('nowMonthStart')
          endTime = getData('nowMonthEnd')
          break
        case 'prveMonth':
          startTime = getData('prveMonthStart')
          endTime = getData('prveMonthEnd')
          break
        case 'nowYear':
          startTime = Year + '-01-01'
          endTime = Year + '-12-31'
          break
        case 'prveYear':
          startTime = Year - 1 + '-01-01'
          endTime = Year - 1 + '-12-31'
          break
        case 'all':
          startTime = ''
          endTime = ''
          break
      }
      startTime =
        this.type === 'datetimerange' && val && val !== 'all'
          ? startTime + ' 00:00:00'
          : startTime
      endTime =
        this.type === 'datetimerange' && val && val !== 'all'
          ? endTime + ' 23:59:59'
          : endTime
      this.$set(this.queryParams, 'joinTime', [startTime, endTime])
    }
  }
}
</script>
