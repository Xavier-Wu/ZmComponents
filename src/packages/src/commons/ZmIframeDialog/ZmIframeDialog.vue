<template>
  <zm-panel :title="dialogTitle" v-model="value" v-loading="loading" class="iframeDialog" @change="pannelClose" style="z-index:9998 !important;">
    <div class="main">
      <div class="page-main hi ml20 p0 df">
        <div id="iframeBox"></div>
        <!-- <iframe ref="iframe" marginheight="0" marginwidth="0" :src="iframeSrc" width="100%" :height="height" @load="loadIframe" frameborder="0" scrolling="no"></iframe> -->
      </div>
    </div>
  </zm-panel>
  <!-- </el-dialog> -->
</template>

<script>
import PanelMixin from './panelMixin'
export default {
  name: 'ZmIframeDialog',
  mixins: [PanelMixin],
  props: {
    params: Object,
    dialogTitle: String // 标题
  },
  data () {
    return {
      loading: false,
      dialogVisible: false,
      height: '300px',
      width: '800px',
      postMessage: {}
    }
  },
  watch: {
    value (val) {
      if (!val) {
        var iframeBox = document.getElementById('iframeBox')
        var ownIframe = document.getElementById('ownIframe')
        iframeBox.removeChild(ownIframe)
        this.removeWatch()
      }
    },
    params (val) {
      const _vm = this
      if (val.command === 'begin') {
        _vm.$nextTick(function () {
          _vm.iframeSrc = val.iframeSrc
          // _vm.iframeSrc += this.$route.query.enterpriseId ? `&enterpriseId=${this.$route.query.enterpriseId}` : ''
          const iframe = document.createElement('iframe')
          iframe.src = _vm.iframeSrc + '?linkIframe=true'
          console.log(iframe.src)
          iframe.id = 'ownIframe'
          iframe.setAttribute('marginheight', '0')
          iframe.setAttribute('marginwidth', '0')
          iframe.setAttribute('frameborder', '0')
          iframe.setAttribute('display', 'block')
          iframe.scrolling = 'no'
          iframe.addEventListener('load', _vm.loadIframe())
          iframe.height = _vm.height
          iframe.width = _vm.width
          const box = document.getElementById('iframeBox')
          box.appendChild(iframe)
          _vm.watchMessage()
        })
      }
    },
    postMessage (val) {
      const _vm = this
      if (val.name === 'close') {
        this.$emit('input', false)
        _vm.$emit('iframeMail', val)
      }
    }
  },
  created () {
    this.loading = true
  },
  mounted () { },
  methods: {
    // iframe load
    loadIframe () {
      var _vm = this
      _vm.width = Math.max(document.body.scrollWidth, document.body.clientWidth)
      _vm.height = Math.max(
        document.body.scrollHeight,
        document.body.clientHeight
      )
      _vm.loading = false
    },
    resizeIframe () {
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
    watchMessage () {
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
    watchPostmessage (e) {
      this.postMessage = JSON.parse(e.data)
    },
    // 去除postmessage监听
    removeWatch () {
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
