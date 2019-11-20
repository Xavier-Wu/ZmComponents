<template>
  <el-input
    v-model="currentValue.address"
    :disabled="disabled"
    placeholder="请输入地址"
    @click.native="onFocusAddress"
    :readonly="!currentValue.address"
    :maxlength="50"
  >
    <template slot="append" v-if="currentValue.address && !disabled">
      <el-tooltip class="item locationBox pointer" effect="dark" content="点击定位地址" placement="right">
        <div calss="locationBox" @click="showMap">
          <i class="el-icon-location fs20"></i>
        </div>
      </el-tooltip>
    </template>
  </el-input>
</template>

<script>
import mapTool from './tool'
export default {
  components: {},
  props: {
    value: {
      type: Object,
      default() {
        return {
          longitude: '',
          latitude: '',
          adCode: '',
          address: ''
        }
      }
    },
    city: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      address: ''
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
      }
    }
  },
  watch: {},
  created() {
    // this.address
  },
  methods: {
    onFocusAddress() {
      if (!this.currentValue.address && !this.disabled) {
        this.showMap();
      }
    },
    showMap() {
      mapTool({
        mapCenter: [],
        address: '',
        code: ''
      })
        .then(d => {
          this.location = d.address
          const params = {
              longitude: '' + d.lnglat[0],
              latitude: '' + d.lnglat[1],
              adCode: d.adcode,
              address: d.address
          }
          this.currentValue = { ...params }
        })
        .catch(() => {})
    }
  }
}
</script>

