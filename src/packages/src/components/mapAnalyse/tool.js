import Vue from 'vue'
import Location from './index'
const MapConstructor = Vue.extend(Location)
// const _pools = []
// 推入一个实例
// let pushInstance = instance => {
//         if (instance) {
//             _pools.push(instance)
//         }
//     }
// 定义实例关闭方法（移除dom）
MapConstructor.prototype.close = function() {
  this.mapShow = false
  // setTimeout(() => {
  //   removeDom(this.$el)
  // }, 500)
  this.closed = true
}
// 获取一个实例
const getInstance = () => {
  // let instance = null
  // if (_pools.length > 0) {
  //   instance = _pools[0]
  //   _pools.splice(0, 1)
  // } else {
  //   instance = new MapConstructor({
  //     el: document.createElement('div')
  //   })
  //   pushInstance(instance)
  // }
  return new MapConstructor({
    el: document.createElement('div')
  })
}
// remove实例from文档
const removeDom = el => {
  if (el.parentNode) {
    el.parentNode.removeChild(el)
  }
}

const Map = (opts = {}) => {
  const $map = document.querySelectorAll('.dialog-map')
  Array.from($map).map($m => {
    removeDom($m)
  })
  return new Promise((resolve, reject) => {
    const instance = getInstance()
    instance.closed = false
    instance.keyword = ''
    instance.code = opts.code || ''
    instance.mapCenter =
      opts.mapCenter[0] && opts.mapCenter[1] ? opts.mapCenter : []
    instance.isResolve = false
    document.body.appendChild(instance.$el)
    Vue.nextTick(() => {
      instance.mapShow = true
      Vue.nextTick(() => {
        instance._initMap()
      })
    })
    instance.$watch('isResolve', val => {
      instance.close()
      instance.$destroy()
      if (val === -1) {
        reject()
      } else if (val === 1) {
        resolve(instance.addrObj)
      }
    })
  })
}

export default Map
