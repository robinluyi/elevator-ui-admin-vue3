<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="申请人的用户编号" prop="userId">
        <el-input v-model="formData.userId" placeholder="请输入申请人的用户编号" />
      </el-form-item>
      <el-form-item label="提交人所在单位" prop="userDeptId">
        <el-input v-model="formData.userDeptId" placeholder="请输入提交人所在单位" />
      </el-form-item>
      <el-form-item label="报险人姓名" prop="userNickname">
        <el-input v-model="formData.userNickname" placeholder="请输入报险人姓名" />
      </el-form-item>
      <el-form-item label="报险人手机号码" prop="userMobile">
        <el-input v-model="formData.userMobile" placeholder="请输入报险人手机号码" />
      </el-form-item>
      <el-form-item label="使用单位编号" prop="endusageDeptId">
        <el-input v-model="formData.endusageDeptId" placeholder="请输入使用单位编号" />
      </el-form-item>
      <el-form-item label="使用单位" prop="endusageDeptName">
        <el-input v-model="formData.endusageDeptName" placeholder="请输入使用单位" />
      </el-form-item>
      <el-form-item label="使用单位负责人" prop="endusageDeptManagerId">
        <el-input v-model="formData.endusageDeptManagerId" placeholder="请输入使用单位负责人" />
      </el-form-item>
      <el-form-item label="电梯id" prop="elevtrId">
        <el-input v-model="formData.elevtrId" placeholder="请输入电梯id" />
      </el-form-item>
      <el-form-item label="梯号" prop="elevtrNumber">
        <el-input v-model="formData.elevtrNumber" placeholder="请输入梯号" />
      </el-form-item>
      <el-form-item label="维保单位编号" prop="maintainDeptId">
        <el-input v-model="formData.maintainDeptId" placeholder="请输入维保单位编号" />
      </el-form-item>
      <el-form-item label="维保单位" prop="maintainDeptName">
        <el-input v-model="formData.maintainDeptName" placeholder="请输入维保单位" />
      </el-form-item>
      <el-form-item label="注册代码" prop="registrationId">
        <el-input v-model="formData.registrationId" placeholder="请输入注册代码" />
      </el-form-item>
      <el-form-item label="配件总价格" prop="totalPrice">
        <el-input v-model="formData.totalPrice" placeholder="请输入配件总价格" />
      </el-form-item>
      <el-form-item label="配件名称" prop="partName">
        <el-input v-model="formData.partName" placeholder="请输入配件名称" />
      </el-form-item>
      <el-form-item label="单位" prop="partUnitId">
        <el-input v-model="formData.partUnitId" placeholder="请输入单位" />
      </el-form-item>
      <el-form-item label="单价" prop="partUnitPirce">
        <el-input v-model="formData.partUnitPirce" placeholder="请输入单价" />
      </el-form-item>
      <el-form-item label="数量" prop="partQuantity">
        <el-input v-model="formData.partQuantity" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item label="小计" prop="partTotal">
        <el-input v-model="formData.partTotal" placeholder="请输入小计" />
      </el-form-item>
      <el-form-item label="小区照片" prop="communityPic">
        <el-input v-model="formData.communityPic" placeholder="请输入小区照片" />
      </el-form-item>
      <el-form-item label="单元照片" prop="unitPic">
        <el-input v-model="formData.unitPic" placeholder="请输入单元照片" />
      </el-form-item>
      <el-form-item label="电梯照片" prop="elevtrPic">
        <el-input v-model="formData.elevtrPic" placeholder="请输入电梯照片" />
      </el-form-item>
      <el-form-item label="故障现场照片" prop="faultPic">
        <el-input v-model="formData.faultPic" placeholder="请输入故障现场照片" />
      </el-form-item>
      <el-form-item label="故障现场照片" prop="faultPic2">
        <el-input v-model="formData.faultPic2" placeholder="请输入故障现场照片" />
      </el-form-item>
      <el-form-item label="流程实例的编号" prop="processInstanceId">
        <el-input v-model="formData.processInstanceId" placeholder="请输入流程实例的编号" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as ReparationApi from '@/api/insurance/reparation'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  userId: undefined,
  userDeptId: undefined,
  userNickname: undefined,
  userMobile: undefined,
  endusageDeptId: undefined,
  endusageDeptName: undefined,
  endusageDeptManagerId: undefined,
  elevtrId: undefined,
  elevtrNumber: undefined,
  maintainDeptId: undefined,
  maintainDeptName: undefined,
  registrationId: undefined,
  totalPrice: undefined,
  partName: undefined,
  partUnitId: undefined,
  partUnitPirce: undefined,
  partQuantity: undefined,
  partTotal: undefined,
  communityPic: undefined,
  unitPic: undefined,
  elevtrPic: undefined,
  faultPic: undefined,
  faultPic2: undefined,
  processInstanceId: undefined
})
const formRules = reactive({
  userId: [{ required: true, message: '申请人的用户编号不能为空', trigger: 'blur' }],
  userDeptId: [{ required: true, message: '提交人所在单位不能为空', trigger: 'blur' }],
  userNickname: [{ required: true, message: '报险人姓名不能为空', trigger: 'blur' }],
  endusageDeptId: [{ required: true, message: '使用单位编号不能为空', trigger: 'blur' }],
  elevtrId: [{ required: true, message: '电梯id不能为空', trigger: 'blur' }],
  maintainDeptId: [{ required: true, message: '维保单位编号不能为空', trigger: 'blur' }],
  partName: [{ required: true, message: '配件名称不能为空', trigger: 'blur' }],
  partUnitId: [{ required: true, message: '单位不能为空', trigger: 'blur' }],
  partUnitPirce: [{ required: true, message: '单价不能为空', trigger: 'blur' }],
  partQuantity: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
  partTotal: [{ required: true, message: '小计不能为空', trigger: 'blur' }]
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
      formData.value = await ReparationApi.getReparation(id)
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
    const data = formData.value as unknown as ReparationApi.ReparationVO
    if (formType.value === 'create') {
      await ReparationApi.createReparation(data)
      message.success(t('common.createSuccess'))
    } else {
      await ReparationApi.updateReparation(data)
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
    userId: undefined,
    userDeptId: undefined,
    userNickname: undefined,
    userMobile: undefined,
    endusageDeptId: undefined,
    endusageDeptName: undefined,
    endusageDeptManagerId: undefined,
    elevtrId: undefined,
    elevtrNumber: undefined,
    maintainDeptId: undefined,
    maintainDeptName: undefined,
    registrationId: undefined,
    totalPrice: undefined,
    partName: undefined,
    partUnitId: undefined,
    partUnitPirce: undefined,
    partQuantity: undefined,
    partTotal: undefined,
    communityPic: undefined,
    unitPic: undefined,
    elevtrPic: undefined,
    faultPic: undefined,
    faultPic2: undefined,
    processInstanceId: undefined
  }
  formRef.value?.resetFields()
}
</script>
