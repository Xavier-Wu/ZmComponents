<!-- ZmCollapseForm 手风琴表单操作 -->
<template>
  <div class="SetPriceTableItemsHandle">
    <div class="tr mr">
      <el-button :disabled="addDisabled" class="mb20" v-if="isControls" type="primary" @click="handleAdd">添加</el-button>
    </div>

    <component :is="outsideBox" v-for="(item,index) in rules" :key="index" v-model="collapseActive">
      <component :is="insideBox" :name="index">
        <div slot="title" class="flex1">
          <div class="m-collapse-title ">
            <div class="flex1">
              <span v-if="item.isEdit">
                <el-input @click.native.stop="preventClick" v-model="item.ruleItemName" class="w150" placeholder="请输入规则名称" v-on:keyup.enter.native.stop="enterKey" v-on:keyup.space.native.stop="spaceKey" />
                <span class="fs12 primary pointer mlr10" @click.stop="handleEditAction(item, index)">取消</span>
                <span class="fs12 primary pointer" @click.stop="handleEditAction(item, index)">确定</span>
              </span>
              <span v-else>
                {{item.ruleItemName = item.ruleItemName ? item.ruleItemName : title + (index + 1)}}
              </span>
            </div>
            <div class="mr20" v-if="isControls">
              <i class="el-icon-rank primary fs22 pointer drag-handle mr10"></i>
              <i class="el-icon-edit primary fs20 pointer mr10" v-if="canEditName" @click.stop="handleEdit(item, index)"></i>
              <i class="el-icon-delete fs20 mr10" :class="rules.length<=min ? 'info notAllow' : 'primary pointer'" @click.stop="handelDel(index, rules.length<=min)"></i>
            </div>
            <!-- <el-button @click.stop="handelSort('up',index)" :disabled="index===0" icon="el-icon-top" type="text">上升</el-button>
            <el-button @click.stop="handelSort('dowm',index)" :disabled="rules.length-1===index" icon="el-icon-bottom" class="mr10" type="text">下降</el-button>
            <el-button v-if="isControls" :disabled="rules.length<=min" @click.stop="handelDel(index)" class="mr10" type="text">删除</el-button> -->
          </div>
        </div>

        <slot v-if="!sortLoading" :row="item" :idx="index"></slot>
      </component>
    </component>
  </div>
</template>

<script>
/**
 *  @click-add(rules)  处理点击添加操作
 *  solt Attributes  row 遍历的数据
 */
import DivEmpty from './components/DivEmpty'
import { Collapse, CollapseItem } from 'element-ui'
import Sortable from 'sortablejs'

export default {
  name: 'ZmCollapseForm',
  props: {
    // 是否多个
    more: {
      type: Boolean,
      default: () => { return true }
    },
    // 控制按钮展示
    controls: {
      type: Boolean,
      default: true
    },

    title: {
      type: String,
      default: '特殊方案规则'
    },

    // 传进来的手风琴数组
    rules: {
      type: Array,
      required: true
    },
    // 没有数据时 是否自动添加
    autoAdd: {
      type: Boolean,
      default: false
    },

    // 最大规则 条数
    max: {
      type: Number,
      default: 5
    },
    min: {
      type: Number,
      default: 1
    },
    canEditName: { // 是否可编辑规则名称
      type: Boolean,
      default: true
    }

  },
  data () {
    return {
      sortable: null,
      DivEmpty,
      Collapse,
      CollapseItem,
      collapseActive: 0, // 展示的手风琴
      sortLoading: false // 刷新时间组件用

    }
  },
  computed: {
    outsideBox () {
      return this.more ? Collapse : DivEmpty
    },
    insideBox () {
      return this.more ? CollapseItem : DivEmpty
    },
    isControls () {
      return this.controls && this.more
    },
    addDisabled () {
      const len = this.rules.length
      return len >= this.max
    }

  },
  mounted () {
    this.init()
  },
  methods: {
    // 初始化方法
    init () {
      this.initData()
      this.setSort()
    },

    initData () {
      const rules = this.rules
      const len = rules.length
      if (!this.more) {
        if (!len) {
          this.handleAdd()
        }
      } else {
        if (!len && this.autoAdd) {
          this.handleAdd()
        }
      }
    },
    enterKey () {},
    spaceKey () {},
    preventClick() {},
    handleAdd () {
      this.$emit('click-add', this.rules)
    },
    handleEdit (item, idx) {
      this.$set(this.rules, idx, { ...item, isEdit: true })
    },
    handleEditAction (item, idx) {
      this.$set(this.rules, idx, { ...item, isEdit: false })
    },
    handelSort (key, index) {
      this.sortLoading = true

      const item = this.rules.splice(index, 1)
      const pushIndex = key === 'up' ? (index - 1) : (index + 1)
      this.$nextTick(() => {
        this.rules.splice(pushIndex, 0, { ...item[0] })
        this.sortLoading = false
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      })
    },

    handelDel (index, flag) {
      if (!flag) {
        this.$confirm('是否确定删除该确认方案', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sortLoading = true
          this.rules.splice(index, 1)
          this.$nextTick(() => {
            this.sortLoading = false
            this.$message({
              message: '操作成功',
              type: 'success'
            });
          })
        }).catch(() => {

        });
      }
    },
    setSort () {
      if (this.sortable && !this.more) return

      this.$nextTick(() => {
        const el = document.querySelectorAll(
          '.SetPriceTableItemsHandle'
        )[0]
        const that = this

        this.sortable = Sortable.create(el, {
          draggable: '.el-collapse',
          ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
          handle: '.drag-handle',
          setData: function (dataTransfer) {
            dataTransfer.setData('Text', '')
            // to avoid Firefox bug
            // Detail see : https://github.com/RubaXa/Sortable/issues/1012
          },
          onEnd: async evt => {
            const nIndex = evt.newIndex
            const oIndex = evt.oldIndex
            if (nIndex === oIndex) return
            const $li = el.children[nIndex]
            const $oldLi = el.children[oIndex]
            // VUE2.0之后，根本原因是Virtual DOM和真实DOM之间出现了不一致，导致拖拽有问题，最直接的方法设置v-for的key
            // 先删除移动的节点
            el.removeChild($li)
            // 再插入移动的节点到原有节点，还原了移动的操作
            if (nIndex > oIndex) {
              el.insertBefore($li, $oldLi)
            } else {
              el.insertBefore($li, $oldLi.nextSibling)
            }

            const oldList = that.rules
            const listTemp = oldList.slice(0)
            const targetRow = listTemp.splice(oIndex - 1, 1)[0]
            that.rules.splice(oIndex - 1, 1)[0]
            that.rules.splice(nIndex - 1, 0, targetRow)
            // listTemp.splice(nIndex, 0, targetRow)
            // that.$set(that.rules, 'data', listTemp)
          }
        })
      })
    }
  }
}

</script>
<style lang='scss' >
.SetPriceTableItemsHandle {
  .m-collapse-title {
    font-size: 18px;
    color: #555;
    margin-bottom: 10px;
    width: 100%;
    display: flex !important;
    justify-content: center;
  }

  .el-collapse {
    border: none !important;
    margin-bottom: 10px !important;
  }

  .el-collapse-item__wrap {
    border-bottom: none;
  }

  .el-collapse-item:last-child {
    border: 1px solid #eee;
    padding: 10px 10px 0px 10px;
    box-sizing: border-box;
  }

  .el-collapse-item__header {
    border: none !important;
  }

  .el-collapse-item__arrow {
    margin-top: -9px !important;
  }
}
</style>
