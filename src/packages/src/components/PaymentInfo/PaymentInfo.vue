<template>
    <div>
        <el-form :model="form" :rules="rules" ref="form" label-width="170px">
            <el-form-item label="付款方式" prop="payType">
                <el-radio-group v-model="form.payType">
                    <el-radio v-for="item in PAYMENT_TYPE_LIST" :label="item.value" :key="item.value">
                        {{item.label}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <div>
                <el-form-item label="转账银行" prop="transferBank" v-if="form.payType==='1'">
                    <el-input v-model="form.transferBank" class="w350"></el-input>
                </el-form-item>
                <el-form-item :label="transferMoney" prop="transferMoney">
                    <el-input v-model="form.transferMoney" class="w350"></el-input>
                </el-form-item>
                <el-form-item :label="transferPeople" prop="transferPeople">
                    <el-input v-model="form.transferPeople" class="w350"></el-input>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
const PAYMENT_TYPE_LIST = [
  {
    label: '银行收账',
    value: '1'
  },
  {
    label: '现金付款',
    value: '2'
  }
];
export default {
    name: 'PaymentInfo',
    props: {
      value: {
        type: Object,
        default: item => {
          return {}
        }
      }
    },
    data() {
        return {
            PAYMENT_TYPE_LIST,
            transferPeople: this.value.payType === '1' ? '转账人' : '付款人',
            transferMoney: this.value.payType === '1' ? '转账金额' : '付款金额',
            form: this.value,
            // {
            //     payType: '1',
            //     transferBank: '',
            //     transferMoney: '',
            //     transferPeople: ''
            // },
            rules: {
                payType: {
                    required: true,
                    message: '请选择付款方式',
                    trigger: 'blur'
                },
                transferBank: { required: true, message: '请输入转账银行', trigger: 'blur' },
                transferMoney: { required: true, message: '请输入金额', trigger: 'blur' },
                transferPeople: { required: true, message: '请输入人名', trigger: 'blur' }
            }
        }
    },
    watch: {
        'form.payType': {
          handler(val) {
            this.transferPeople = val === '1' ? '转账人' : '付款人'
            this.transferMoney = val === '1' ? '转账金额' : '付款金额'
          },
          deep: true
        }
    },
    methods: {

    }
}
</script>
