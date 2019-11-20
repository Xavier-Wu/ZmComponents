#vue-element-assist

## install

> Please install Webpack first!

### install vue-element-assist

Using npm:
```
npm install vue-element-assist --save
```
Using a script tag for global use:

```html
<script type="text/javascript" src="./vue-element-assist/dist/static/js/vueAssist.js"></script>
```


## Usage

```
import Vue from 'vue'
import vueAssist from 'vue-element-assist'

const options = {...}
Vue.install(vueAssist, options)
```

### options

```
const options = {
  // 全局安装过滤器
  filters: {
  	// 日期格式化
    // eg. new Date() | date(format = options.utils.fmt.date.format) => '2018-12-12 12:12:12'
    date: true,
    // 货币格式化
    // eg. 2000 | currency(opts = options.utils.fmt.currency) => '¥2, 000.00'
    currency: true,
    // 数组/对象取值
    // eg. sex | value({man: '男', male: '女'}) => sex = 'man' => '男'
    // 	   或 sex | value(['男', '女']) => sex = 0 => '男'
    value: true,
    // 图片url补全
    // eg. photoUrl | url
    url: true,
    // 七牛图片显示策略
    // eg. photoUrl | imageView2(opts = options.utils.imageView2.params)
    imageView2: true
  },
  plugins: {
    axios: {
      // 将extend到axios.defaults
      defaults: {},
      adapters: {
      	// 缓存adapter，在缓存时间内将不会发起http请求
        cache: {
          maxAge: 5 * 60 * 1000
        }
      },
      // 所有的拦截器只要配置为false则不启用
      interceptor: {
        // 支持post/put/patch 的表单提交方式， 
        // config.contentType = 'application/x-www-form-urlencoded'
        applicationForm: true,
        // 将请求中的驼峰数据转成下划线格式
        // 将转化url、config.params上的参数，非get时转化config.data
        // config.dataToUnderline = false 单次禁用
        dataToUnderline: true,
        // 将请求中的下划线数据转成驼峰格式
        // 将转化url、config.params上的参数，非get时转化config.data
        // config.dataToHump = false 单次禁用
        dataToHump: false,
        // 返回数据的下划线转驼峰
        // config.responseDataToHump = false 单次禁用
        responseDataToHump: true,
        // 返回数据的驼峰转下划线
        // config.responseDataToUnderline = false 单次禁用
        responseDataToUnderline: false,
        // 请求错误时，将接口返回的data转下划线
        // config.responseErrToUnderline = false 单次禁用
        responseErrToUnderline: false,
        // 请求错误时，将接口返回的data转驼峰
        // config.responseErrToHump = false 单次禁用
        responseErrToHump: true,
        // 添加随机参数禁用浏览器缓存
        disableCache: true,
        // 全局错误拦截器
        errorHandle: {
          handleError(error) {
            warn('Please rewrite axios.interceptor.errorHandle.handleError')
            return Promise.reject(error)
          }
        },
        // http请求显示加载中
        loading: {
          // 第一个http请求发起时
          showLoader() {
            warn('Please rewrite axios.interceptor.loading.showLoader')
          },
          // 最后一个http请求结束时
          hideLoader() {
            warn('Please rewrite axios.interceptor.loading.hideLoader')
          }
        },
        // Authorization授权
        authorization: {
          MAC_ID: '2YotnFZFEjr1zCsicMWpAA',
          MAC_KEY: 'mac_key',
          decode: true,
          getMacKey() {
            let macKey = VueCookie.get(this.MAC_KEY) || ''
            return this.decode ? decodeURIComponent(macKey) : macKey
          }
        },
        // 移除值为空的数据，config.removeEmpty = true
        // 将移除url、config.params上的空值，非get时移除化config.data上的空值
        removeEmpty: true,
        // 只返回response.data，注：该拦截器必须放置在最后
        // 若有需要自定义axios的拦截器则需要关闭该拦截器以获取response对象
        returnResponseData: false
      }
    },
    bus: {
      // 全局事件总线，跨组件监听/调用，在实例销毁时自动解除事件绑定
      // vm.$onBus
      // vm.$onceBus
      // vm.$offBus 区别于vm.$off，此处不支持解除全部事件，vm在销毁时会自动解除绑定在当前实例上的所有事件
      // vm.$emitBus
      // [String | Boolean]
      prefix: '__BUS__'
    }
  },
  utils: {
    // 授权校验配置项，非特例无需修改
    authMac: {
      requestContentSymbol: '\n',
      authMacSymbol: 'MAC',
      nonceLen: 8
    },
    fmt: {
      // 日期格式化
      date: {
        format: 'yyyy-MM-dd hh:mm:ss'
      },
      // 货币格式化
      currency: {
        places: 2,
        symbol: '￥',
        thousand: ', ',
        decimal: '.'
      },
      // 图片域名
      imgDomain: ''
    },
    rand: {
      // 随机数的数据模型
      model: [
        'abcdefghijklmnopqrstuvwxyz',
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        '1234567890'
      ]
    },
    // 七牛图片显示策略
    imageView2: {
      name: 'imageView2',
      params: {
        interlace: 1
      }
    }
  }
}
```

### utils

1、fmt 格式化相关工具

```
fmt.date(date, format = options.utils.fmt.date.format)
fmt.dateFormat(date, format)
fmt.currency(money, opt = options.utils.fmt.currency)
fmt.value(key, obj, defaultValue)
fmt.url(url)
fmt.prop(propStr, obj, defaultValue = '')
```

2、type 对象类型

```
type(obj)
    
  boolean
  number
  string
  function
  array
  date
  regexp
  object
  error
  symbol
```

3、noop 空函数

4、eachOwn(obj, (value, key, obj) => {}) 对象自有属性遍历

5、isDomain 是否为域名

6、compatUrl(url, jsonData) 组合地址栏参数

7、removeEmpty 移除空值

8、decomposeUrl 分解url

```
return
  source
  protocol
  host
  port
  hostname
  origin
  query
  params
  file
  hash
  path
  uri
  segments
```

9、fireKeyEvent(el, evtType, keyCode) 模拟按键事件

10、isAbsoluteUrl(url) 是否为http开头的绝对地址

11、transformContext(expression) 根据vue指令中的expression取得目标值所在的对象和key

12、isApplicationForm(contentType) axios中使用applicationForm的判断依据

13、randText(len) 根据options.utils.rand.model随机生成文本

14、randRange(min, max) 在给定范围内取得随机数

15、strToHump(str) 字符串转驼峰

16、dataToHump(data) 对象属性转驼峰

17、strToUnderline(str) 字符串转下划线

18、dataToUnderline(data) 对象属性转下划线

19、addEventListener(target, eventName, listener) dom添加事件

20、removeEventListener(target, eventName, listener) dom移除事件

21、requireContext(requireContext, excludeObjKeyOrArr = [], flatContext = true) 将require.context读取的模块数组化

22、requireContextToObj(requireContext, excludeObjKeyOrArr = [], flatContext = true) 将require.context读取的模块对象化

23、getAuthMacHeaders({
      url,
      method,
      macId,
      macKey
    }) hmac认证头部信息
    
24、isParentNode(node, parentNode) 是否为给定节点的父节点

25、imageView2(url, w, h, m = 1, opts = options.utils.imageView2.params) 七牛图片显示策略

26、base64ToBlob(base64Code) base64转blob

27、downloadFile(blob, fileName, clearTime = 10000) blob下载为文件

28、downloadBase64Img(base64Code, fileName, clearTime = 10000) 下载base64图片

29、clearSearch(params)清空查询条件

30、compressImg(file, maxWidth = 128, maxHeight = 128) 压缩图片

31、rotateAngleImg(img, deg, canvas) 旋转图片，只支持90度倍数的旋转

32、readFileAsImg(file) 文件读取为图片

33、fileOrBlobToDataURL(fileOrBlob) 文件/blob转化为base64

34、dataURLToBlob(dataUrl) base64转为blob，同26

35、toArray(arrLike, start = 0) 类数组转数组

36、cipher.encode(str, r) 加密字符串
    cipher.decode(str, r) 解密字符串
    cipher.encodeJSON(json, r) 加密json
    cipher.decodeJSON(json, r) 解密json
    cipher.encodeEnv(env, r) 加密env

