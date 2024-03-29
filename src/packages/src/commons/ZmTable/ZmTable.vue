<template>
  <div>
    <el-table
      v-loading="options.loading"
      :data="tableParams.data"
      :stripe="tableOpt.stripe"
      :border="tableOpt.border"
      :max-height="tableOpt.maxHeight"
      :highlight-current-row="tableOpt.highlLightCurrentRow"
      :show-header="tableOpt.showHeader"
      :default-expand-all="tableOpt.defaultExpandAll"
      :expand-row-keys="expandRowKeys"
      :row-key="pk"
      v-bind="$attrs"
      v-on="$listeners"
      ref="zmTable"
      @row-click="handleRowClick"
      @select="handleSelectionChange"
      @select-all="handleAllSelectionChange"
      @selection-change="selectionChange"
      @current-change="handleCurrentChange"
      @expand-change="expandChange"
      header-row-class-name="table-header-row"
    >
      <!--序号-->
      <el-table-column v-if="tableOpt.index" label="序号" type="index" width="50" align="center"></el-table-column>

      <!--数据列-->
      <template v-for="(column, index) in columns">
        <!-- :reserve-selection="tableOpt.mutilpleSelect" @selection-change="handleSelectionChange" -->
        <!--selection选择框-->
        <el-table-column
          :key="index+'x'"
          v-if="tableOpt.mutilpleSelect && index===0"
          :reserve-selection="true"
          type="selection"
          style="width:50px"
          :align="columns.algin||'center'"
          :selectable="column.selectable"
          :label-class-name="tableOpt.hideSelectionHeard?'hide-heard':''"
        ></el-table-column>
        <el-table-column
          :key="index"
          v-if="!column.hide"
          :class-name="column.className"
          :prop="column.prop"
          :label="column.label"
          :sortable="column.sortable"
          :sort-method="column.sortMethod"
          :align="column.align||'center'"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :type="column.type||''"
          :show-overflow-tooltip="((''+column.toolTip==='undefined')?tableOpt.toolTip:column.toolTip)"
        >
          <template slot="header" slot-scope="scope">
            <template v-if="column.renderHead">
              <RenderHead
                :head-index="scope.$index"
                :render-head="column.renderHead"
                :column="column"
              />
            </template>
            <template v-else>
              <template>{{column.label}}</template>
            </template>
          </template>
          <template slot-scope="scope">
            <template v-if="!column.render">{{scope.row[column.prop]}}</template>

            <!-- render -->
            <template v-else>
              <RenderDom
                :row="scope.row"
                :col-index="index"
                :row-index="scope.$index"
                :render="column.render"
                :column="column"
              />
            </template>

            <!-- render button -->
            <template v-if="column.button">
              <template v-for="(btn, i) in column.group">
                <a
                  href="javascript:;"
                  v-if="btn.tag==='a'"
                  :key="i"
                  :class="[`text-${btn.type}`]"
                  @click.stop="btn.onClick(scope.row, scope.$index)"
                >
                  <i :class="[`${btn.icon}`]" class="vm"></i>
                  <span class="vm">{{btn.name}}</span>
                </a>
                <el-button
                  v-else
                  :type="btn.type"
                  :key="i"
                  :size="btn.size || 'mini'"
                  :icon="btn.icon"
                  :disabled="btn.disabled"
                  :plain="btn.plain"
                  @click.stop="btn.onClick(scope.row, scope.$index)"
                >
{{btn.name}}
</el-button>
              </template>
            </template>

            <!-- slot 你可以其他常用项 -->
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-if="tableOpt.showPagination&&tableParams.data&&tableParams.data.length"
      :total="Number(tableParams.count)"
      :current-page="currentPage"
      :page-size="tableParams.pageSize"
      :page-sizes="[5,10,20, 30, 50]"
      :layout="tableOpt.layout"
      @size-change="handleSizeChange"
      @current-change="handleIndexChange"
      class="mt20 tr"
      background
    ></el-pagination>
  </div>
</template>

<script>
// const unique = (arr, key) => {
//   let hash = {}
//   return arr.reduce((item, next) => {
//     if (!hash[next[key]]) {
//       hash[next[key]] = true && item.push(next)
//     }
//     // hash[next.phone] ? '' : ((hash[next.phone] = true) && item.push(next))
//     return item
//   }, [])
// }
// zm-table的单双选模式
const SELECTION_MODEL = {
  CHECK_BOX: 'checkbox', // 多选
  RADIO: 'radio'
}
export default {
  name: 'ZmTable',
  components: {
    RenderDom: {
      name: 'renderTable',
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        colIndex: Number,
        rowIndex: Number,
        render: Function,
        column: {
          type: Object,
          default: null
        }
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const { row, colIndex, rowIndex } = ctx.props
        return ctx.props.render(createElement, row, rowIndex, colIndex)
      }
    },
    RenderHead: {
      name: 'renderTableHead',
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        headIndex: Number,
        renderHead: Function,
        column: {
          type: Object,
          default: null
        }
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 column index
       */
      render(createElement, ctx) {
        const { column, headIndex } = ctx.props
        return ctx.props.renderHead(createElement, column, headIndex)
      }
    }
  },
  props: {
    // data: Array,
    options: {
      type: Object,
      default() {
        return {
          loading: false,
          toolTip: true,
          isCreateData: true, // 是否直接加载数据
          isStartPage: false
        }
      }
    }, // 表格参数控制 maxHeight、stripe 等等...
    columns: Array,
    fetch: Function, // 获取数据的函数
    expandRowKeys: Array,
    pk: {
      type: String,
      default: 'id'
    },
    tableParams: {
      type: [String, Boolean, Object],
      default() {
        return {
          data: [],
          page: 1,
          pageSize: 10,
          total: 0,
          selectList: []
        }
      }
    },
    // 需要回显的数据，根据pk来判定
    defaultSelections: {
      type: Array,
      default() {
        return []
      }
    },
    selectionModel: {
      type: [String],
      default() {
        return SELECTION_MODEL.CHECK_BOX
      }
    }
  },
  data() {
    return {
      getRowKeys(row) {
        return row.id
      },
      tableOpt: {
        isSetPage: false, // 是否设置初始pageSize为999
        isCreateData: true, // 是否直接加载数据
        toolTip: true, // 是否显示tip
        stripe: true, // 是否为斑马纹
        border: true, // 是否有竖边框
        initTable: true, // 是否默认请求列表
        highlLightCurrentRow: false, // 是否要高亮当前行
        showHeader: true, // 是否现实表头
        showPagination: true, // 分页，不传则不显示
        expand: false, // 展开列
        defaultExpandAll: false, // 是否默认展开所有列
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      // 经过处理的，需要回显的
      // defaultSelections: {
      //   maps: {},
      //   total: 0
      // },
      // 保存的已选项
      selectionsCache: {
        maps: {},
        total: 0
      }
      // 用饿了么的方法获取已选项
      // elSelectionsCache: []
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.tableParams.page
      }
    },
    hasSelect() {
      return !!this.tableParams.selectList.length
    },
    tableSelectLength() {
      return this.tableParams.selectList.length
    },
    selectedIds() {
      return this.tableParams.selectList.map(item => {
        return item[this.pk]
      })
    }
  },
  watch: {
    'tableOpt.showPagination'(val) {
      if (!val && !this.tableOpt.isSetPage) {
        this.tableParams.pageSize = 999
      }
    },
    'options.mutilpleSelect'(val) {
      // 实时切换是否展示多选框
      this.tableOpt.mutilpleSelect = val
    }
  },
  created() {
    this.initDefaultSelections()
  },
  mounted() {
    // 传入的tableOpt覆盖默认设置
    this.tableOpt = Object.assign({}, this.tableOpt, this.options)
    if (this.fetch && this.tableOpt.isCreateData) {
      this.tableOpt.initTable && this.fetch()
    }
  },
  methods: {
    // 使用elementui自带的回填
    elToggleRowSelection() {
      // 数组对象中只存在id字段时，不重新选择时，回显的数据中也只会有id，有需要其他字段要另外处理
      this.defaultSelections.forEach(e => {
        if (e[this.pk]) this.$refs.zmTable.toggleRowSelection(e, true)
      })
      this.initDefaultSelections()
      this.$emit(
        'select',
        this.getSelectionsList(),
        this.getSelectionsCacheLength()
      )
      this.$emit(
        'table-select',
        this.getSelectionsList(),
        this.getSelectionsCacheLength()
      )
    },
    // 默认选中转为容易处理的格式
    initDefaultSelections() {
      this.addRows(this.defaultSelections)
    },
    // 判断是否已被选中
    getSelectionsCacheItem(pkValue) {
      const selectionsMap = this.selectionsCache.maps
      return selectionsMap[pkValue]
    },
    // 保存选中的
    addSelectionsCache(pkValue, data) {
      // 有可能是从需要回显的数据添加的，后面再次填充完整数据
      if (!this.selectionsCache.maps[pkValue]) {
        this.selectionsCache.total++
      }
      this.selectionsCache.maps[pkValue] = data
    },
    // 删除选中的
    removeSelectionsCacheItem(pkValue) {
      if (this.selectionsCache.maps[pkValue]) {
        delete this.selectionsCache.maps[pkValue]
        this.selectionsCache.total--
      }
    },
    // 获取已选数据的长度
    getSelectionsCacheLength() {
      return this.selectionsCache.total || 0
    },
    // 获取已选数据的数组
    getSelectionsList(flag) {
      let list = []
      if (flag || this.defaultSelections.length) {
        for (const key in this.selectionsCache.maps) {
          list.push(this.selectionsCache.maps[key])
        }
      } else {
        // list = this.elSelectionsCache;
        list = this.$refs.zmTable.selection.slice(0) || []
      }
      return list
    },
    // 清除所有选择的数据
    clearSelection() {
      this.$refs.zmTable && this.$refs.zmTable.clearSelection()
      // this.elSelectionsCache = [];
      this.$set(this.selectionsCache, 'maps', {})
      this.$set(this.selectionsCache, 'total', 0)
    },
    async handleSizeChange(size) {
      // 切换每页显示的数量
      this.tableParams.pageSize = size
      await this.fetch()
    },
    handleCurrentChange(row) {
      // 未开启highlight-current-row时，勾选复选框仍有几率会触发handleCurrentChange事件，导致自定义selections数据异常
      if (row && this.tableOpt.highlLightCurrentRow) {
        this.selectionsCache.maps = {
          [row[this.pk]]: row
        }
        this.selectionsCache.total = 1
      }
    },
    expandChange(row, expandedRows) {
      this.$emit('expand-change', row, expandedRows)
      this.$emit('table-expand-change', row, expandedRows)
    },
    handleSelectionChange(selection, row) {
      // 因为翻页点选后selection会出现为undefined的元素
      const allRows = selection.filter(item => !!item)
      // 根据表格单选事件确定取消是取消了哪一行
      if (allRows.find(item => item[this.pk] === row[this.pk])) {
        // 选中新增一行
        this.addRows([row])
      } else {
        // 取消删除一行
        this.removeRows([row])
      }
      this.elSelectionsCache = allRows
      this.$emit(
        'select',
        this.getSelectionsList(),
        this.getSelectionsCacheLength()
      )
      this.$emit(
        'table-select',
        this.getSelectionsList(),
        this.getSelectionsCacheLength()
      )
    },
    // 表格全选事件
    handleAllSelectionChange(selection) {
      const chosenIds = selection.map(i => i[this.pk])
      const dataList = this.tableParams.data
      const flag = chosenIds.includes(dataList[0][this.pk])
      // 如果有则是全选否则就是全取消
      if (flag) {
        this.addRows(dataList)
      } else {
        this.removeRows(dataList)
      }
      this.elSelectionsCache = selection
      this.$emit(
        'select-all',
        this.getSelectionsList(),
        this.getSelectionsCacheLength()
      )
      this.$emit(
        'table-select-all',
        this.getSelectionsList(),
        this.getSelectionsCacheLength()
      )
    },
    // 添加选中行
    addRows(rows) {
      // 如果选中的数据中没有这条就添加进去
      rows
        .filter(i => i[this.pk])
        .forEach(v => {
          const pkValue = v[this.pk]
          if (!this.getSelectionsCacheItem(pkValue)) {
            this.addSelectionsCache(pkValue, v)
          }
        })
    },
    // 取消选中行
    removeRows(rows) {
      if (!this.getSelectionsCacheLength) return
      rows.forEach(v => {
        const pkValue = v[this.pk]
        if (this.getSelectionsCacheItem(pkValue)) {
          this.removeSelectionsCacheItem(pkValue)
        }
      })
    },
    handleIndexChange(current) {
      // 切换页码
      this.tableParams.page = current
      this.fetch()
    },
    // 数据回显
    setItemChecked() {
      if (!this.$refs.zmTable) return
      if (!this.getSelectionsCacheLength()) return
      const tableList = this.tableParams.data
      tableList.some((item, index) => {
        if (!this.getSelectionsCacheLength()) return true
        const pkValue = item[this.pk]
        if (this.getSelectionsCacheItem(pkValue)) {
          this.$nextTick(v => {
            this.toggleRowSelection(item)
          })
        }
      })
    },
    toggleRowSelection(item) {
      this.tableOpt.highlLightCurrentRow
        ? this.$refs.zmTable.setCurrentRow(item)
        : this.$refs.zmTable.toggleRowSelection(
            item, // 应该回填的行数据
            true
          )
    },
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
      this.$emit('table-row-click', row, event, column)
    },
    selectionChange(e) {
      // console.log(e)
      this.$emit('selection-change', e)
      this.$emit('table-selection-change', e)
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.zmTable.toggleRowExpansion(row, expanded)
    },
    doLayout() {
      this.$refs.zmTable.doLayout()
    }
  }
}
</script>
