<!-- SelectWeekDateTime  选择周、天、时间 -->
<template>
  <div class="SelectWeekDateTime">
    <slot></slot>
    <zm-checkbox v-if="hasWeek" :list="WEEKS" v-model="Data[weekKey]" name-key="label" />
    <!-- <el-button v-if="controls" class="mt10" type="primary" size="mini" @click="addItem">添加</el-button> -->
    <template v-for="( item , index ) in Data[timeArrayKey]">
      <div v-if="!loading" class="df-center mt10" :key="index">
        <SelectDateTime
          :has-date="hasDate"
          :data="item"
          :date-key="dateKey"
          :start-time-key="startTimeKey"
          :end-time-key="endTimeKey"
        />
        <el-button v-if="controls" class="ml10" type="text" @click="addItem(index)">添加</el-button>
        <el-button
          v-if="controls"
          class="ml10"
          type="text"
          :disabled="index===0"
          @click="handleDel(index)"
        >
删除
</el-button>
      </div>
    </template>
  </div>
</template>

<script>
import SelectDateTime from '../SelectDateTime'
const WEEKS = [
  {
    value: '1',
    label: '周一'
  },
  {
    value: '2',
    label: '周二'
  },
  {
    value: '3',
    label: '周三'
  },
  {
    value: '4',
    label: '周四'
  },
  {
    value: '5',
    label: '周五'
  },
  {
    value: '6',
    label: '周六'
  },
  {
    value: '0',
    label: '周日'
  }
];
/**
 * data 默认格式 {week:'',timeArray:[]}
 */
export default {
  name: 'SelectWeekDateTime',
  components: { SelectDateTime },
  props: {
    type: {
      type: String,
      default: 'week',
      validator: function(v) {
        return ['date', 'week'].indexOf(v) !== -1
      }
    },
    // 是否隐藏日期
    isHasDate: {
      type: Boolean,
      default: false
    },
    // 新增 删除按钮展示
    controls: {
      type: Boolean,
      default: true
    },

    data: {
      type: Object,
      required: true
    },
    weekKey: {
      type: String,
      default: 'week'
    },
    timeArrayKey: {
      type: String,
      default: 'timeArray'
    },

    // SelectDateTime 参数
    dateKey: {
      type: String,
      default: 'date'
    },
    startTimeKey: {
      type: String,
      default: 'startTime'
    },
    endTimeKey: {
      type: String,
      default: 'endTime'
    }
  },
  data() {
    return {
      WEEKS,
      Data: this.data,
      loading: false // 刷新用
    }
  },

  computed: {
    hasDate() {
      return this.type === 'date' && !this.isHasDate
    },

    hasWeek() {
      return this.type === 'week'
    }
  },

  mounted() {
    this.initData()
  },

  methods: {
    // 初始化方法
    init() {
      this.initData()
    },
    initData() {
      const len = this.Data[this.timeArrayKey].length
      if (len === 0) {
        this.addItem()
      }
    },

    addItem(index) {
      console.log(index)
      const item = {
        [this.dateKey]: '',
        [this.startTimeKey]: '',
        [this.endTimeKey]: ''
      }
      if (index >= 0) {
        this.loading = true
        this.Data[this.timeArrayKey].splice(index + 1, 0, item)
        this.$nextTick(() => {
          this.loading = false
        })
      } else {
        this.Data[this.timeArrayKey].push(item)
      }
    },

    handleDel(index) {
      this.loading = true
      this.Data[this.timeArrayKey].splice(index, 1)
      this.$nextTick(() => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang='scss' >
.SelectWeekDateTime {
  .el-checkbox-group {
    margin-top: 10px;
  }
}
</style>
