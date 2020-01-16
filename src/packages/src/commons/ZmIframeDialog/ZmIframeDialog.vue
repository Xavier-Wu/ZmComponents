<template>
  <div>
    <div id="iframeBox" v-if="type==='router'"></div>
    <zm-panel
      v-else
      :title="dialogTitle"
      v-model="value"
      v-loading="loading"
      class="iframeDialog"
      @change="pannelClose"
      style="z-index:9998 !important;"
    >
      <div class="main">
        <div class="page-main hi ml20 p0 df">
          <div id="iframeBox"></div>
          <!-- <iframe ref="iframe" marginheight="0" marginwidth="0" :src="iframeSrc" width="100%" :height="height" @load="loadIframe" frameborder="0" scrolling="no"></iframe> -->
        </div>
      </div>
      <div slot="footer" class="tr">
        <slot name="footer" />
        <el-button size="small" @click="pannelClose">返回</el-button>
      </div>
    </zm-panel>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import PanelMixin from './panelMixin'
export default {
  mixins: [PanelMixin],
  props: {
    params: Object,
    type: {
      type: String,
      default: 'panel'
    },
    dialogTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      height: '300px',
      width: '800px',
      postMessage: {}
    }
  },
  watch: {
    value(val) {
      if (!val) {
        var iframeBox = document.getElementById('iframeBox')
        var ownIframe = document.getElementById('ownIframe')
        iframeBox.removeChild(ownIframe)
        this.removeWatch()
      }
    },
    params(val) {
      const _vm = this
      if (val.command === 'begin') {
        _vm.$nextTick(function() {
          _vm.iframeSrc = val.iframeSrc
          // _vm.iframeSrc += this.$route.query.enterpriseId ? `&enterpriseId=${this.$route.query.enterpriseId}` : ''
          const iframe = document.createElement('iframe')
          iframe.src = _vm.iframeSrc
          console.log(iframe.src)
          iframe.id = 'ownIframe'
          iframe.setAttribute('marginheight', '0')
          iframe.setAttribute('marginwidth', '0')
          iframe.setAttribute('frameborder', '0')
          iframe.setAttribute('display', 'block')
          iframe.scrolling = 'no'
          iframe.addEventListener('load', _vm.loadIframe())
          iframe.height = this.type === 'router' ? _vm.height : _vm.height - 146
          iframe.width = this.type === 'router' ? _vm.width : _vm.width - 40
          const box = document.getElementById('iframeBox')
          box.appendChild(iframe)
          _vm.watchMessage()
        })
      }
    },
    postMessage(val) {
      this.$emit('get-message', val)
      const _vm = this
      if (val.name === 'close') {
        this.$emit('input', false)
        _vm.$emit('iframeMail', val)
      }
    }
  },
  created() {
    this.loading = true
  },
  mounted() {},
  methods: {
    // iframe load
    loadIframe() {
      var _vm = this
      _vm.width = Math.max(document.body.scrollWidth, document.body.clientWidth)
      _vm.height = Math.max(
        document.body.scrollHeight,
        document.body.clientHeight
      )
      _vm.loading = false
    },
    resizeIframe() {
      var _vm = this
      _vm.width = Math.max(document.body.scrollWidth, document.body.clientWidth)
      _vm.height = Math.max(
        document.body.scrollHeight,
        document.body.clientHeight
      )
      const iframe = document.getElementById('ownIframe')
      iframe.height = _vm.height
      iframe.width = _vm.width
    },
    // 添加postmessage事件监听
    watchMessage() {
      const _vm = this
      if (typeof window.addEventListener !== 'undefined') {
        window.addEventListener('message', _vm.watchPostmessage, false)
        window.addEventListener('resize', _vm.resizeIframe, false)
      } else if (typeof window.attachEvent !== 'undefined') {
        window.attachEvent('message', _vm.watchPostmessage, false)
        window.attachEvent('resize', _vm.resizeIframe, false)
      }
    },
    // 取得message
    watchPostmessage(e) {
      this.postMessage = JSON.parse(e.data)
    },
    // 摧毁后再创建
    reloadIframe() {
      this.loading = true
      var iframeBox = document.getElementById('iframeBox')
      var ownIframe = document.getElementById('ownIframe')
      iframeBox.removeChild(ownIframe)
      this.removeWatch()
    },
    // 调用子页面刷新方法跨域
    reload(fun) {
      var ownIframe = document.getElementById('ownIframe')
      ownIframe.contentWindow[fun || 'getInfo']()
    },
    // 去除postmessage监听
    removeWatch() {
      const _vm = this
      if (typeof window.removeEventListener !== 'undefined') {
        window.removeEventListener('message', _vm.watchPostmessage, false)
        window.removeEventListener('resize', _vm.resizeIframe, false)
      } else if (typeof window.detachEvent !== 'undefined') {
        window.detachEvent('message', _vm.watchPostmessage, false)
        window.detachEvent('resize', _vm.resizeIframe, false)
      }
    }
  }
}
</script>
<style lang="scss"></style>
