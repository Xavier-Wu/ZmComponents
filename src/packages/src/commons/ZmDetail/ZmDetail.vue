<template>
  <div class="df-wrap">
    <div
      class="fs14 dlh"
      :class="!item.hide?item.width||(inline?'mw400':'wp100'):''"
      v-for="(item,index) in detailList"
      :key="index"
    >
      <template v-if="!item.hide">
        <span :class="item.labelClass" v-if="item.name">{{item.name}}：</span>
        <slot :name="item.slot" v-if="item.slot"></slot>
        <span
          :class="item.valueClass"
          v-else
        >{{info[item.key]||(typeof item.render==='function'? item.render():item.render)||'--'}}{{item.unit}}</span>
      </template>
    </div>
  </div>
</template>
<script>
/** 配置项（list) //需要使用render时，定义方法，不需要使用，配置即可
 *  配置例子 src\views\viewsNew\resource\chanel\chanelInto\const.js 的detailList
 *  export const detailList = info => {
 *   return [{name:'',render:''},{name:'',render:()=>{return}},{name:'',key:''}{name:'',slot:''}]
 *  }
 *  export const detailList = [{name:'',key:''}]
 *  hide:是否隐藏
 *  name :标题
 *  slot :配置自定义插槽
 *  render:自定义
 *  key：默认
 *  unit：unit 单位
 *  width: 设置宽度 wp100时整行,不设置时，文字超出时也可以执行定格或换行
 *  labelClass：标题样式
 *  valueClass：值样式
 */

export default {
  name: 'ZmDetail',
  props: {
    inline: {
      type: Boolean,
      default: true
    },
    list: {
      type: [Function, Array],
      default: () => {}
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    obj: {
      // 列表中传入详情中的值
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    detailList() {
      return typeof this.list === 'function'
        ? this.list(this.info, this)
        : this.list
    }
  }
}
</script>
<style lang="scss" scoped>
.dlh {
  line-height: 34px;
}
</style>
