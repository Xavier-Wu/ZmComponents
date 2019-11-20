<!-- 标签列表 -->
<template>
  <div>
    <i class="el-icon-price-tag transform-icon-tag fs20 vm mr10"></i>
    <el-tag class="mr5" v-for="tag in tags" :key="tag[propsContent.label]" :closable="closable" :type="type" @close="closeTag(tag[propsContent.value])">
      {{tag[propsContent.label]}}
    </el-tag>
    <el-button class="ml10" type="primary" size="mini" @click="toAdd" v-if="closable">添加标签</el-button>
    <zm-dialog title="添加标签" :visible.sync="addShow" append-to-body :before-close="dialogClose" :close-on-click-modal="false" size="small">
      <el-form label-width="100px" :model="obj" ref="form">
        <el-form-item label="标签:">
          <span>卖品标签最多勾选{{max}}个</span>
        </el-form-item>
        <el-form-item label="" v-if="addShow">
          <ul class="tag-table">
            <li class="tag-table-header">
              <div>标签内容</div>
              <div>操作</div>
            </li>
            <li class="tag-table-item" v-for="(item, index) in tagList" :key="index">
              <div>
                <el-checkbox class="mr10" v-model="item.checked" :disabled="item.disabled" @change="getSelects"></el-checkbox>
                <el-input class="w230" v-if="item.isEdit" v-model="item[propsContent.label]" placeholder="请输入标签名称，不超过3个字" :maxlength="3" />
                <span v-else>{{item[propsContent.label]}}</span>
              </div>
              <div>
                <el-button type="text" v-show="item.isEdit" :disabled="!item[propsContent.label]" @click="onOperateClick('confirm', item, index)">确定</el-button>
                <el-button type="text" v-show="item.isEdit" @click="onOperateClick('cancel', item, index)">取消</el-button>
                <el-button type="text" v-show="item[propsContent.value]" class="danger" @click="onOperateClick('del', item, index)">删除</el-button>
              </div>
            </li>
          </ul>
          <span :class="isAdd || tagList.length > 29 ? 'info notAllow' : 'primary pointer'" @click="toAddTag">+新增标签</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="tr">
        <el-button @click="dialogClose">取 消</el-button>
        <el-button type="primary" @click="submit" :disabled="selectList < 1">确 定</el-button>
      </div>
    </zm-dialog>
  </div>
</template>
<script>
import dialogMixin from './dialogMixin'

export default {
  name: 'TagList',
  mixins: [dialogMixin],
  props: {
    value: { // 双向绑定值
      type: String,
      default: ''
    },
    type: { // tag类型
      type: String,
      default: ''
    },
    api: { // 标签接口
      type: Object,
      default () {
        return {
          list: () => { },
          add: () => { },
          del: () => { }
        }
      }
    },
    propsContent: { // 列表prop
      type: Object,
      default () {
        return {
          label: 'name',
          value: 'id'
        }
      }
    },
    params: { // 列表请求参数
      type: Object,
      default () {
        return {}
      }
    },
    closable: { // 是否可关闭/显示添加
      type: Boolean,
      default: true
    },
    max: { // 表格最大勾选数量
      type: Number,
      default: 2
    }
  },
  data () {
    return {
      tagList: [],
      addShow: false,
      isAdd: false,
      selectList: []
    }
  },
  computed: {
    tags () {
      const ids = this.value.split(',').filter(i => i)
      const filterTags = this.tagList && this.tagList.length > 0 ? this.tagList.filter(tag => {
        return ids.includes(tag[this.propsContent.value])
      }) : []
      return filterTags
    }
  },
  created () { },
  mounted () {
    if (this.api.list) {
      this.getTagList()
    }
  },
  methods: {
    closeTag (id) {
      const filterTags = this.tags.filter(i => i[this.propsContent.value] !== id)
      const ids = filterTags.map(i => i[this.propsContent.value])
      this.$emit('input', ids.join(','))
    },
    async getTagList () {
      this.tagList = []
      const ids = this.value.split(',').filter(i => i)
      const _res = await this.api.list(this.params)
      _res.forEach(i => {
        i.isEdit = false
        i.checked = ids.includes(i[this.propsContent.value])
      })
      this.tagList = _res
      this.getSelects()
    },
    getSelects () {
      const ids = []
      this.selectList = this.tagList.filter(i => {
        if (i.checked) {
          ids.push(i[this.propsContent.value])
        }
        return i.checked
      })
      this.tagList.forEach(i => {
        if (ids.length === this.max) {
          i.disabled = !i.checked
        } else {
          i.disabled = false
        }
      })
    },
    toAdd () {
      this.selectList = []
      this.getTagList()
      this.addShow = true
    },
    onOperateClick (type, item, idx) {
      const that = this
      switch (type) {
        case 'confirm':
          this.api.add({ name: item.name }).then(() => {
            that.$message.success('操作成功')
            that.getTagList()
          })
          this.isAdd = false
          break;
        case 'cancel':
          if (item[this.propsContent.value]) {
            this.$set(this.tagList, idx, {
              ...item,
              isEdit: false,
              checked: false
            })
          } else {
            this.tagList.splice(idx, 1)
          }
          this.isAdd = false
          break;
        case 'del':
          this.api.del({ id: item[this.propsContent.value] }).then(() => {
            that.$message.success('操作成功')
            that.getTagList()
          })
          break;

        default:
          break;
      }
      this.getSelects()
    },
    toAddTag () {
      if (!this.isAdd) {
        this.tagList.push({
          name: '',
          isEdit: true,
          checked: false
        })
        this.isAdd = true
        this.getSelects()
      }
    },
    dialogClose () {
      this.addShow = false
      this.isAdd = false
    },
    submit () {
      const ids = this.selectList.map(i => i[this.propsContent.value])
      this.$emit('input', ids.join(','))
      this.dialogClose()
    }
  }
}
</script>
<style lang="scss">
.transform-icon-tag {
  transform: rotate(320deg);
}
.tag-table {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ebeef5;

  .tag-table-header {
    border-bottom: 1px solid #ebeef5;
    background-color: #f7f8fa;
    color: #303133;

    div {
      display: inline-block;
      vertical-align: middle;
      width: 49%;
      text-align: center;
    }
    div:nth-child(1) {
      text-align: left;
      padding-left: 37px;
    }
  }
  .tag-table-item {
    padding: 10px 0;
    border-top: 1px solid #ebeef5;

    div {
      display: inline-block;
      vertical-align: middle;
      width: 49%;
      text-align: center;
    }
    div:nth-child(1) {
      text-align: left;
      padding-left: 10px;
    }
  }

  .tag-table-item:nth-child(2) {
    border-top: 0;
  }
}
</style>
