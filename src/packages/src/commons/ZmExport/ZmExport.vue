<!-- 导出 -->
<template>
  <!-- <div class="vb"> -->
  <el-button :type="type" :icon="icon" @click="onExport" :disabled="disabled" v-bind="$attrs" v-on="$listeners">{{text}}</el-button>
  <!-- </div> -->
</template>
<script>
import { getJumpList } from '@/utils/auth'

export default {
  name: 'ZmExport',
  props: {
    type: { // 按钮类型
      type: String,
      default: 'default'
    },
    icon: { // 按钮图标
      type: String,
      default: ''
    },
    api: { // 调用接口
      type: Function,
      default: () => { }
    },
    params: { // 请求参数
      type: Object,
      default () {
        return {}
      }
    },
    text: { // 按钮文案
      type: String,
      default: '导出'
    },
    beforeExportFn: { // 导出前处理函数
      type: Function,
      default: () => { }
    },
    disabled: { // 是否禁用按钮
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {
    async onExport () {
      const that = this
      await this.beforeExportFn()
      setTimeout(() => {
        this.api(this.params).then(_res => {
          if (_res && _res.url) {
            const temp = _res.url.split('/')
            const name = (temp.length && temp[temp.length - 1]) || new Date().toLocaleString()
            const link = document.createElement('a')

            link.style.display = 'none'
            link.href = _res.url
            link.setAttribute('download', name)
            document.body.appendChild(link)
            link.click()
            that.$message.success('导出成功')
            that.$emit('after-export')

            setTimeout(() => {
              document.body.removeChild(link)
            }, 20000)
          } else {
            that.$confirm('导出成功!', {
              confirmButtonText: '前往下载中心'
            }).then(() => {
              const arr = JSON.parse(getJumpList())
              const msg = arr.find(i => i.key === 'download')
              if (window.parent && window.parent.postMessage) {
                window.parent.postMessage(JSON.stringify({ isIframe: 1, name: 'jump', ...msg }), '*')
              } else {
                console.warn('target browser not support postMessage')
              }
              that.$emit('after-export')
            }).catch((e) => {
              console.log(e)
            })
          }
        }).catch(err => {
          that.$emit('err-export', err)
        })
      }, 0)
    }
  }
}
</script>
