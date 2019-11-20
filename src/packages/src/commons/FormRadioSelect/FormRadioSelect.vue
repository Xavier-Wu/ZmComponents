<template>
<div class="form-radio-select">
  <el-radio-group v-model="radioValue" class="vb db-radio">
    <el-radio v-for="(radio, index) in radioList" :key="index" :label="radio.value">
      <div class="radio-select-label vm">{{radio.label}}</div>
      <div class="radio-select vm ml10" v-if="radio.selectFlag && value === radio.value">
        <el-select class="w230" v-model="radio.select.selectValue" :placeholder="radio.select.placeholder" :filterable="radio.select.filterable" :multiple="radio.select.multiple" @change="chooseSelect">
          <el-option v-for="(option, idx) in radio.select.options" :key="idx" :label="option[radio.select.optionLabel]" :value="option[radio.select.optionValue]">
          </el-option>
        </el-select>
      </div>
      <div class="radio-select-desc" v-if="radio.desc">{{radio.desc}}</div>
    </el-radio>
  </el-radio-group>
</div>
</template>

<script>
export default {
  name: 'FormRadioSelect',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    radioList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    radioValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', val)
        this.$emit('input', val)
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    chooseSelect(val) {
      this.$emit('select-change', val)
    }
  }
}
</script>

<style lang="scss">
.radio-select-desc {
  margin-left: 24px;
  padding-top: 10px;
  color: #999;
  font-size: 13px;
}
</style>
