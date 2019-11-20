<!-- 权限树 -->
<template>
  <div>
    <div class="tree-permission-table-head">
      <div class="vm head-2">菜单</div>
      <div class="vm head-8">操作权限</div>
    </div>
    <el-tree class="tree-table" :data="treeData" :props="treeProps" show-checkbox :node-key="treeProps.valueKey" default-expand-all :expand-on-click-node="false" @check-change="treeCheck" ref="permissionTree">
      <span class="permission-tree-node" slot-scope="{ node, data }">
        <span>{{node.label}}</span>
        <span v-if="node.level === 3 && data && data.actionList && data.actionList.length > 0">
          <el-checkbox class="vm ml80" :indeterminate="data.isIndeterminate" v-model="data.isAll" @change="checkAll(data)">全选</el-checkbox>
          <el-checkbox-group class="vm inner-tree-check-group" v-model="data.permissionList" @change="checkChange(data)">
            <el-checkbox v-for="action in data.actionList" :label="action[treeProps.valueKey]" :key="action[treeProps.valueKey]">{{action[treeProps.label]}}</el-checkbox>
          </el-checkbox-group>
        </span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'PermissionTree',
  props: {
    value: { // 双向绑定字符串
      type: String,
      default: ''
    },
    tree: { // 树数据
      type: Array,
      default () {
        return []
      }
    },
    treeProps: {
      type: Object,
      default () {
        return {
          valueKey: 'id',
          label: 'menuName'
        }
      }
    }
  },
  data () {
    return {
      treeData: [],
      checkedList: [],
      checkedTreeList: [],
      pIdList: []
    }
  },
  computed: {
    treeValue () {
      if (this.value) {
        console.log(this.value)
        return this.value.split(',').filter(i => i)
      } else {
        return []
      }
    }
  },
  watch: {
    value (val) {
      if (val && val.length && this.checkedList.length === 0) {
        this.treeData = this.computTree(this.tree, true)
        this.checkedList = val.split(',').filter(i => i)
      }
    },
    tree (val) {
      this.treeData = this.computTree(val)
    },
    pIdList (val) {
      const arr = this.treeValue.filter(i => !val.includes(i))
      this.$refs.permissionTree.setCheckedKeys(arr)
    }
  },
  created () {
    this.treeData = this.computTree(this.tree)
  },
  mounted () {
  },
  methods: {
    findLastChild (list, isEdit) {
      if (list && list.length > 0) {
        list.forEach((i, idx) => {
          if (i.position === '3') {
            if (i.children) {
              const actionList = JSON.parse(JSON.stringify(i.children))
              list[idx].actionList = actionList || []
              if (isEdit) {
                const actionIds = actionList.map(action => action[this.treeProps.valueKey])
                list[idx].permissionList = this.treeValue.filter(vid => actionIds.includes(vid))
              } else {
                list[idx].permissionList = []
              }
              list[idx].children = []
              setTimeout(() => {
                if (list[idx].actionList && list[idx].permissionList && list[idx].actionList.length && list[idx].permissionList.length) {
                  list[idx].isAll = list[idx].actionList.length === list[idx].permissionList.length
                  list[idx].isIndeterminate = list[idx].permissionList.length > 0 && !list[idx].isAll
                }
              }, 0)
            }
          } else {
            if (i.children) {
              this.pIdList.push(i[this.treeProps.valueKey])
            }
            this.findLastChild(i.children)
          }
        })
      }
    },
    computTree (list, isEdit = false) {
      const treeTemp = JSON.parse(JSON.stringify(list))
      this.findLastChild(treeTemp, isEdit)
      return treeTemp
    },
    checkAll (val) {
      const ids = val.actionList.map(i => i[this.treeProps.valueKey])
      val.permissionList = val.isAll ? ids : []
      val.isIndeterminate = false
      this.keepTreeChecked()
      this.setCheckedList(val.permissionList, ids)
    },
    checkChange (val) {
      const ids = val.actionList.map(i => i[this.treeProps.valueKey]) || []
      if (val.permissionList && val.actionList && val.actionList.length && val.permissionList.length) {
        val.isAll = val.permissionList.length === val.actionList.length
        val.isIndeterminate = val.permissionList.length > 0 && !val.isAll
      }
      this.keepTreeChecked()
      this.setCheckedList(val.permissionList, ids)
    },
    treeCheck (obj, isCheck, child) {
      if (obj.actionList && obj.actionList.length > 0) {
        const ids = obj.actionList.map(i => i[this.treeProps.valueKey])
        obj.permissionList = isCheck ? ids : []
        obj.isAll = obj.actionList.length === obj.permissionList.length
        obj.isIndeterminate = obj.permissionList.length > 0 && !obj.isAll
        this.setCheckedList(obj.permissionList, ids)
      }
      const wholeCheckedIds = this.$refs.permissionTree.getCheckedKeys()
      const halfCheckedIds = this.$refs.permissionTree.getHalfCheckedKeys()
      const checkedIds = wholeCheckedIds.concat(halfCheckedIds)
      this.checkedTreeList = checkedIds.length > this.checkedTreeList.length ? checkedIds : this.checkedTreeList
      this.setCheckedList(checkedIds, this.checkedTreeList)
    },
    keepTreeChecked () {
      const checkedIds = this.$refs.permissionTree.getCheckedKeys()
      this.treeData = [...this.treeData]
      this.$refs.permissionTree.setCheckedKeys(checkedIds)
    },
    setCheckedList (arr, compareArr = []) {
      const concatList = this.checkedList.concat(arr)
      this.checkedList = [...new Set(concatList)]
      if (compareArr && compareArr.length > 0 && compareArr.length !== arr.length) {
        const needDelIds = compareArr.filter(i => !arr.includes(i))
        this.checkedList = this.checkedList.filter(i => !needDelIds.includes(i))
      }
      const outValue = this.checkedList && this.checkedList.length > 0 ? this.checkedList.join(',') : ''
      this.$emit('input', outValue)
    }
  }
}
</script>
<style lang="scss">
.tree-permission-table-head {
  border: 1px solid #dcdfe6;
  border-bottom: none;
  background: #fafafa;
  font-weight: 500;
  .head-2 {
    text-indent: 1rem;
    width: 23%;
  }
  .head-8 {
    text-indent: 1rem;
    width: 76%;
  }
}
.tree-table {
  border: 1px solid #dcdfe6;
  border-bottom: none;

  .el-tree-node__content {
    height: 46px;
    border-bottom: 1px solid #dcdfe6;
  }

  .permission-tree-node {
    .el-checkbox {
      font-weight: 400 !important;
    }
    .inner-tree-check-group {
      margin-top: 4px;
    }
  }
}
</style>
