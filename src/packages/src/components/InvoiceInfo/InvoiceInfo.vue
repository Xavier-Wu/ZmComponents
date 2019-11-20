<template>
  <div>
    <el-form :rules="rules" ref="form" :model="form" label-width="170px" size="small" label-position="left">
      <el-form-item label="发票类型:" prop="invoiceType">
        <!--!<zm-select
              class="w350"
              placeholder="请选择发票类型"
              v-model="form.invoiceType"
              select-type="getInvoiceTypeList"
            ></zm-select> -->
        <el-select class="w350" v-model="form.invoiceType" clearable placeholder="请选择">
          <el-option :label="type.label" :value="type.value" v-for="(type,index) in INVOICE_TYPE_LIST" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票抬头:" prop="title" v-if="form.invoiceType!=='1'">
        <el-input clearable v-model.trim="form.title" placeholder="输入发票抬头的信息" class="w350"></el-input>
      </el-form-item>
      <!-- 企业相关START -->
      <el-form-item label="税号:" prop="taxNo" v-if="form.invoiceType === '4' || form.invoiceType === '6' || form.invoiceType === '5'">
        <el-input clearable v-model.trim="form.taxNo" placeholder="请输入内容" class="w350"></el-input>
      </el-form-item>
      <el-form-item label="企业地址:" prop="companyAddress" v-if="form.invoiceType === '6'">
        <el-input clearable v-model.trim="form.companyAddress" placeholder="请输入内容" class="w350"></el-input>
      </el-form-item>
      <el-form-item label="电话号码:" prop="companyMobile" v-if="form.invoiceType === '6'">
        <el-input clearable v-model.trim="form.companyMobile" placeholder="请输入内容" class="w350"></el-input>
      </el-form-item>
      <el-form-item label="开户银行:" prop="bank" v-if="form.invoiceType === '6'">
        <el-input clearable v-model.trim="form.bank" placeholder="请输入内容" class="w350"></el-input>
      </el-form-item>
      <el-form-item label="银行账号:" prop="bankNo" v-if="form.invoiceType === '6'">
        <el-input clearable v-model.trim="form.bankNo" placeholder="请输入内容" class="w350"></el-input>
      </el-form-item>
      <!-- 企业相关END -->
      <!-- 个人相关START -->
      <el-form-item label="身份证号:" prop="idNumber" v-if="form.invoiceType === '2' || form.invoiceType === '3'">
        <el-input clearable v-model.trim="form.idNumber" placeholder="输入索要发票人身份证号码" class="w350"></el-input>
      </el-form-item>
      <!-- 个人相关END -->
      <el-form-item label="电子邮箱:" prop="receiveEmail" v-if="form.invoiceType === '3' || form.invoiceType === '5'">
        <el-input clearable v-model.trim="form.receiveEmail" placeholder="输入索要发票人电子邮箱" class="w350"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
const INVOICE_TYPE_LIST = [
  {
    label: '无需发票',
    value: '1'
  },
  {
    label: '个人增值税普通发票--纸质发票',
    value: '2'
  },
  {
    label: '个人增值税普通发票--电子发票',
    value: '3'
  },
  {
    label: '企业增值税普通发票--纸质发票',
    value: '4'
  },
  {
    label: '企业增值税普通发票--电子发票',
    value: '5'
  },
  {
    label: '企业增值税专用发票--纸质发票',
    value: '6'
  }
];
export default {
  name: 'InvoiceInfo',
  props: {
    value: {
      type: Object,
      default: item => {
        return {}
      }
    }
  },
  data () {
    return {
      INVOICE_TYPE_LIST,
      form: this.value,
      // {
      //   invoiceType: '1', //
      //   title: '',
      //   taxNo: '',
      //   companyAddress: '',
      //   companyMobile: '',
      //   bank: '',
      //   bankNo: '',
      //   idNumber: '',
      //   receiveEmail: '',
      //   receiveType: '',
      //   receiveName: '',
      //   receiveMobile: '',
      //   receiveAddress: ''
      // },
      rules: {
        invoiceType: {
          required: true,
          message: '请选择发票类型',
          trigger: 'blur'
        },
        title: { required: true, message: '请输入发票抬头', trigger: 'blur' },
        taxNo: { required: true, message: '请输入税号', trigger: 'blur' },
        companyAddress: {
          required: true,
          message: '请输入企业地址',
          trigger: 'blur'
        },
        companyMobile: {
          required: true,
          message: '请输入电话号码',
          trigger: 'blur'
        },
        bank: { required: true, message: '请输入开户银行', trigger: 'blur' },
        bankNo: { required: true, message: '请输入银行账号', trigger: 'blur' },
        idNumber: {
          required: true,
          message: '请输入身份证号',
          trigger: 'blur'
        },
        receiveEmail: {
          required: true,
          message: '请输入电子邮箱',
          trigger: 'blur'
        }
      }
    }
  },
  watch: {

  },
  mouted () {

  },
  created () {
    console.log(this.value, this.data)
  },
  methods: {

  }
}
</script>
