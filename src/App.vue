<template>
  <div id="app">
    {{'http://shilin.dkuykt.com/FpolXc1rXwCXtMOxvwZRexyYues_' | imageView2(100, 100, 1, { q: 100 })}}
    <p>{{123456789 | number}}</p>
    <p>{{123456789 | numberLabel}}</p>
    <input ref="file"
           type="file">
    <demo v-if="visible" />
    <a href="javascript: void(0)"
       @click="() => visible = !visible">visible: {{visible}}</a>
    <a href="javascript: void(0)"
       @click="emit">emit</a>
  </div>
</template>

<script>
import axios from 'axios'
import { orientImg } from '@/packages/src/tools/img'
import { downloadFile, htmlSpecialCharacter, cipher } from '@/packages/src/utils'
// import { getAuthMacHeaders } from '@packages/src/utils'
import Demo from './demo'

export default {
  name: 'App',
  components: {
    Demo
  },
  data() {
    return {
      visible: true
    }
  },
  created() {
    let api = 'http://xxxx/push/V1.0/common/account/user'
    // let encodeStr = cipher.encode(api)
    // let decodeStr = cipher.decode(encodeStr)
    // console.log('encode: ' + encodeStr)
    // console.log('decode: ' + decodeStr)

    let json = {
      api,
      bool: true,
      num: 1
    }
    let s = { "NODE_ENV": '"development"', "BASE_URL": '"/"', "DEBUG_MODE": true, "API": '"dev-api"' }
    let encodeJSON = cipher.encodeEnv(s)
    let decodeJSON = cipher.decodeJSON(encodeJSON)
    console.log('encode: ' + JSON.stringify(encodeJSON))
    console.log('decode: ' + JSON.stringify(decodeJSON))
    // axios({
    //   url: 'http://xxxx/push/V1.0/common/account/login',
    //   method: 'POST',
    //   responseType: 'json',
    //   data: { "type": 1, "phone": "1", "pass_word": "1" }
    // }).then(data => {
    //   console.log(data)
    // })
  },
  mounted() {
    // let s = htmlSpecialCharacter.encodeReg('<')
    // console.log(s + '        ' + htmlSpecialCharacter.decodeReg(s))

    // let p = htmlSpecialCharacter.encode('<')
    // console.log(p + '        ' + htmlSpecialCharacter.decode(p))
    // this.$nextTick(() => {
    //   this.$refs.file.addEventListener('change', function (event) {
    //     let file = event.target.files[0]
    //     orientImg(file).then(data => {
    //       downloadFile(data.blob, data.fileName || 'photo.png')
    //     })
    //   })
    // })
  },
  methods: {
    emit() {
      this.$emitBus('index.list', 1, 2, 3)
    }
  }
}
</script>
