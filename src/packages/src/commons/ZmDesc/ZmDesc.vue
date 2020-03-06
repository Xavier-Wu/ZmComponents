<template>
  <transition name="el-alert-fade">
    <div class="el-alert zm-desc" :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]" v-show="visible" role="alert">
      <div class="el-alert__content">
        <i class="el-alert__icon zm-desc-icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
        <span class="el-alert__title" :class="[ isBoldTitle ]" v-if="title || $slots.title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="el-alert__description" v-if="$slots.default && !description && isExpand">
          <slot></slot>
        </p>
        <p class="el-alert__description" v-if="description && !$slots.default && isExpand">{{ description }}</p>
        <i class="el-alert__closebtn" :class="`el-icon-arrow-${isExpand ? 'up' : 'down'}`" v-if="description || $slots.default" @click="isExpand = !isExpand"></i>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
const TYPE_CLASSES_MAP = {
  'success': 'el-icon-success',
  'warning': 'el-icon-warning',
  'error': 'el-icon-error'
};
export default {
  name: 'ZmDesc',

  props: {
    title: { // 标题文案
      type: String,
      default: ''
    },
    description: { // 描述文案
      type: String,
      default: ''
    },
    type: { // 样式类型
      type: String,
      default: 'info'
    },
    closable: { // 是否可关闭
      type: Boolean,
      default: true
    },
    closeText: { // 关闭按钮文案
      type: String,
      default: ''
    },
    showIcon: { // 是否展示icon
      type: Boolean,
      default: true
    },
    center: Boolean, // 是否居中
    effect: {
      type: String,
      default: 'light',
      validator: function (value) {
        return ['light', 'dark'].indexOf(value) !== -1;
      }
    }
  },

  data () {
    return {
      visible: true,
      isExpand: false
    };
  },

  computed: {
    typeClass () {
      return `el-alert--${this.type}`;
    },

    iconClass () {
      return TYPE_CLASSES_MAP[this.type] || 'el-icon-info';
    },

    isBigIcon () {
      return this.description || this.$slots.default ? 'is-big' : '';
    },

    isBoldTitle () {
      return this.description || this.$slots.default ? 'is-bold' : '';
    }
  },

  methods: {
    close () {
      this.visible = false;
      this.$emit('close');
    }
  }
};
</script>
<style lang="scss">
.zm-desc {
  &.el-alert--warning {
    color: #f39800;
    background: rgba(255, 191, 0, 0.1);
  }
  .el-alert__description {
    color: #9c9fad !important;
    margin-left: 30px;
  }
  .el-alert__content {
    padding: 0 8px 0 0;
  }
  .zm-desc-icon {
    font-size: 18px !important;
    width: 18px !important;
    margin-right: 12px;
    vertical-align: top !important;
  }
}
</style>