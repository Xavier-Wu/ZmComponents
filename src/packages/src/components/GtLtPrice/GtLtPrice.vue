<!-- GtLtPrice 小于多少钱大于多少钱 -->
<template>
  <div>
    <div class="df" v-if="!disabled">
      <zm-select-com class="w120 mr10" :has-null="false" :list="GT" v-model="max.type" />
      <el-input-number class="w60 mr10" :min="null" v-model="max.servicePrice" :controls="false" />
      <zm-select-com class="w120 mr10" :has-null="false" :list="LT" v-model="min.type" />
      <el-input-number class="w60 mr10" :min="null" v-model="min.servicePrice" :controls="false" />
    </div>
    <div class="df" v-else>
      <div class=" mr10">{{max.type | getTypeName(GT)}}</div>
      <div class=" mr10">{{max.servicePrice}}元</div>
      <div class=" mr10">{{min.type | getTypeName(LT)}}</div>
      <div class=" mr10">{{min.servicePrice}}元</div>
    </div>
  </div>
</template>

<script>
// 适用数据格式
// "min": {
//   "type": "egt",
//     "servicePrice": "1"
// },
// "max": {
//   "type": "elt",
//     "servicePrice": "2"
// }
export const GT = [
  {
    label: '大于',
    value: 'gt'
  },
  {
    label: '大于等于',
    value: 'egt'
  }
];

export const LT = [
  {
    label: '小于',
    value: 'lt'
  },
  {
    label: '小于等于',
    value: 'elt'
  }
];
export default {
  name: 'GtLtPrice',
  props: {
    data: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      LT,
      GT,
      min: {},
      max: {}

    }
  },
  created() {
    this.min = this.data.min
    this.max = this.data.max
  },
  methods: {
    // 初始化方法
    init() { }
  }
}

</script>
<style lang='scss' scoped>
</style>
