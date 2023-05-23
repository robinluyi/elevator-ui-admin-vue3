<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="保单号" prop="orderId">
        <el-input v-model="formData.orderId" placeholder="请输入保单号" />
      </el-form-item>
      <el-form-item label="险种代码(ZHI,ZKM)" prop="insrType">
        <el-select v-model="formData.insrType" placeholder="请选择险种代码(ZHI,ZKM)">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.INSURANCE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称" prop="projectName">
        <el-input v-model="formData.projectName" placeholder="请输入项目名称" />
      </el-form-item>
      <el-form-item label="省" prop="provincial">
        <el-input v-model="formData.provincial" placeholder="请输入省" />
      </el-form-item>
      <el-form-item label="市" prop="city">
        <el-input v-model="formData.city" placeholder="请输入市" />
      </el-form-item>
      <el-form-item label="区" prop="district">
        <el-input v-model="formData.district" placeholder="请输入区" />
      </el-form-item>
      <el-form-item label="街道" prop="street">
        <el-input v-model="formData.street" placeholder="请输入街道" />
      </el-form-item>
      <el-form-item label="被保险人" prop="insuredUsername">
        <el-input v-model="formData.insuredUsername" placeholder="请输入被保险人" />
      </el-form-item>
      <el-form-item label="起保时间" prop="insrStartTime">
        <el-date-picker
          v-model="formData.insrStartTime"
          type="date"
          value-format="x"
          placeholder="选择起保时间"
        />
      </el-form-item>
      <el-form-item label="终保时间" prop="insrEndTime">
        <el-date-picker
          v-model="formData.insrEndTime"
          type="date"
          value-format="x"
          placeholder="选择终保时间"
        />
      </el-form-item>
      <el-form-item label="电梯总数" prop="total">
        <el-input v-model="formData.total" placeholder="请输入电梯总数" />
      </el-form-item>
      <el-form-item label="直梯总数" prop="totalStraight">
        <el-input v-model="formData.totalStraight" placeholder="请输入直梯总数" />
      </el-form-item>
      <el-form-item label="扶梯总数" prop="totalEscalator">
        <el-input v-model="formData.totalEscalator" placeholder="请输入扶梯总数" />
      </el-form-item>
      <el-form-item label="机构名称" prop="organizationName">
        <el-input v-model="formData.organizationName" placeholder="请输入机构名称" />
      </el-form-item>
      <el-form-item label="备注" prop="comments">
        <el-input v-model="formData.comments" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="是否装配配件" prop="hasPart">
        <el-input v-model="formData.hasPart" placeholder="请输入是否装配配件" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { DICT_TYPE, getStrDictOptions } from '@/utils/dict'
import * as OrderApi from '@/api/insurance/order'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  orderId: undefined,
  insrType: undefined,
  projectName: undefined,
  provincial: undefined,
  city: undefined,
  district: undefined,
  street: undefined,
  insuredUsername: undefined,
  insrStartTime: undefined,
  insrEndTime: undefined,
  total: undefined,
  totalStraight: undefined,
  totalEscalator: undefined,
  organizationName: undefined,
  comments: undefined,
  hasPart: undefined
})
const formRules = reactive({
  orderId: [{ required: true, message: '保单号不能为空', trigger: 'blur' }],
  insrType: [{ required: true, message: '险种代码(ZHI,ZKM)不能为空', trigger: 'change' }],
  projectName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
  provincial: [{ required: true, message: '省不能为空', trigger: 'blur' }],
  city: [{ required: true, message: '市不能为空', trigger: 'blur' }],
  district: [{ required: true, message: '区不能为空', trigger: 'blur' }],
  street: [{ required: true, message: '街道不能为空', trigger: 'blur' }],
  insuredUsername: [{ required: true, message: '被保险人不能为空', trigger: 'blur' }],
  insrStartTime: [{ required: true, message: '起保时间不能为空', trigger: 'blur' }],
  insrEndTime: [{ required: true, message: '终保时间不能为空', trigger: 'blur' }],
  total: [{ required: true, message: '电梯总数不能为空', trigger: 'blur' }],
  totalStraight: [{ required: true, message: '直梯总数不能为空', trigger: 'blur' }],
  totalEscalator: [{ required: true, message: '扶梯总数不能为空', trigger: 'blur' }],
  organizationName: [{ required: true, message: '机构名称不能为空', trigger: 'blur' }],
  hasPart: [{ required: true, message: '是否装配配件不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await OrderApi.getOrder(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as OrderApi.OrderVO
    if (formType.value === 'create') {
      await OrderApi.createOrder(data)
      message.success(t('common.createSuccess'))
    } else {
      await OrderApi.updateOrder(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    orderId: undefined,
    insrType: undefined,
    projectName: undefined,
    provincial: undefined,
    city: undefined,
    district: undefined,
    street: undefined,
    insuredUsername: undefined,
    insrStartTime: undefined,
    insrEndTime: undefined,
    total: undefined,
    totalStraight: undefined,
    totalEscalator: undefined,
    organizationName: undefined,
    comments: undefined,
    hasPart: undefined
  }
  formRef.value?.resetFields()
}
</script>
