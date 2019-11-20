<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div v-show="value" class="el-loading-mask" :style="{ backgroundColor: background || '' , zIndex: zIndex}" :class="[{ 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <p v-if="text" class="el-loading-text">{{ text }}</p>
        <div v-if="!spinner" class="el-loading-spinner-Progress">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="updPercent"></el-progress>
        </div>
        <i v-else class="el-icon-loading"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { PopupManager } from 'element-ui/lib/utils/popup'

export default {
  name: 'ZmUpdateLoading',
  props: {
    value: { // 显示
      type: Boolean,
      default: false,
      required: true
    },
    text: { // 显示文案
      type: String,
      default: '正在更新数据...'
    },
    fullscreen: { // 是否全频
      type: Boolean,
      default: true
    },
    background: { // 背景色
      type: String,
      default: 'rgba(0, 0, 0, 0.25)'
    },
    spinner: { // 是否图标
      type: Boolean,
      default: false
    },
    api: { // 调用接口
      type: Function,
      default: () => { }
    },
    sec: { // 轮询间隔
      type: Number,
      default: 1000
    },
    query: { // 请求参数
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      updPercent: 0,
      zIndex: 1
    }
  },
  created () {
    this.zIndex = PopupManager.nextZIndex()
    this.getProgress()
  },
  methods: {
    getProgress () {
      this.api(this.query).then(_res => {
        this.updPercent = +_res.rand
        if (+_res.rand < 100) {
          setTimeout(() => {
            this.getProgress()
          }, this.sec)
        } else {
          this.$message.success('更新成功')
          this.$emit('close-loading')
        }
      }).catch(() => {
        this.$message.error('更新失败')
        this.$emit('close-loading')
      })
    },
    handleAfterLeave () {
      this.$emit('after-leave')
    }
  }
};
</script>
<style lang="scss" scoped>
.el-loading-spinner-Progress {
  margin: 10px auto;
  width: 30%;
}
</style>
