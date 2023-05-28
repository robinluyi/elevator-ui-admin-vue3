<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-width="180px"
    v-loading="formLoading"
  >
    <el-card class="mb-20">
      <el-form-item label="申请人的用户编号" prop="userId">
        <el-input-number
          v-model="formData.userId"
          placeholder="请输入申请人的用户编号"
          disabled
          :controls="false"
        />
      </el-form-item>
      <el-form-item label="提交人所在单位" prop="userDeptId">
        <el-input-number v-model="formData.userDeptId" placeholder="请输入提交人所在单位" />
      </el-form-item>
      <el-form-item label="报险人姓名" prop="userNickname">
        <el-input v-model="formData.userNickname" placeholder="请输入报险人姓名" disabled />
      </el-form-item>
      <el-form-item label="报险人手机号码" prop="userMobile">
        <el-input v-model="formData.userMobile" placeholder="请输入报险人手机号码" maxlength="11" />
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
        <el-input v-model="formData.totalPrice" placeholder="" disabled />
      </el-form-item>
    </el-card>
    <div v-for="(part, index) in formData.parts" :key="'part' + index">
      <el-card class="mb-20">
        <!-- <Icon icon="ep:plus" class="mr-5px" /> Part {{ index + 1 }} -->
        <div class="part-fields">
          <el-form-item
            label="零件名称"
            :prop="'parts.' + index + '.partName'"
            :rules="formRules.partName"
          >
            <el-input v-model="part.partName" placeholder="请输入零件名称" />
          </el-form-item>
          <el-form-item label="单位" prop="part.partUnitId">
            <el-select v-model="part.partUnitId" placeholder="请选择单位" clearable>
              <el-option
                v-for="dict in getIntDictOptions(DICT_TYPE.ELEVTR_PART_UNIT)"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="part.partUnitPirce">
            <el-input-number
              v-model="part.partUnitPirce"
              :min="0"
              :precision="0"
              :controls="false"
            />
          </el-form-item>
          <el-form-item label="数量" prop="part.partQuantity">
            <el-input-number
              v-model="part.partQuantity"
              :precision="0"
              :min="0"
              :controls="false"
            />
          </el-form-item>
          <el-form-item label="小计" prop="part.partTotal">
            <el-input-number
              v-model="part.partTotal"
              :min="0"
              :step="0.01"
              :controls="false"
              disabled
            />
          </el-form-item>

          <el-form-item style="float: right">
            <el-button
              type="danger"
              size="small"
              :disabled="formData.parts.length === 1"
              @click="removePart(index)"
              >移除</el-button
            >
          </el-form-item>
        </div>
      </el-card>
    </div>
    <div v-for="(fault, index) in formData.faults" :key="'fault' + index">
      <el-card class="mb-20">
        <!-- <Icon icon="ep:plus" class="mr-5px" /> fault {{ index + 1 }} -->
        <div class="fault-fields">
          <el-form-item label="小区照片" :prop="'parts.' + index + '.communityPic'">
            <UploadImg v-model="fault.communityPic" :limit="1" />
          </el-form-item>
          <el-form-item label="单元照片" :prop="'parts.' + index + '.unitPic'">
            <UploadImg v-model="fault.unitPic" :limit="1" />
          </el-form-item>
          <el-form-item label="电梯照片" :prop="'parts.' + index + '.elevtrPic'">
            <UploadImg v-model="fault.elevtrPic" :limit="1" />
          </el-form-item>
          <el-form-item label="故障现场照片1" :prop="'parts.' + index + '.faultPic'">
            <UploadImg v-model="fault.faultPic" :limit="1" />
          </el-form-item>
          <el-form-item label="故障现场照片2" :prop="'parts.' + index + '.faultPic2'">
            <UploadImg v-model="fault.faultPic2" :limit="1" />
          </el-form-item>
          <el-form-item label="故障现场照片3" :prop="'parts.' + index + '.faultPic3'">
            <UploadImg v-model="fault.faultPic3" :limit="1" />
          </el-form-item>
          <el-form-item label="故障现场照片4" :prop="'parts.' + index + '.faultPic4'">
            <UploadImg v-model="fault.faultPic4" :limit="1" />
          </el-form-item>
          <el-form-item style="float: right">
            <el-button
              type="danger"
              size="small"
              :disabled="formData.parts.length === 1"
              @click="removeFault(index)"
              >移除</el-button
            >
          </el-form-item>
        </div>
      </el-card>
    </div>

    <el-form-item>
      <el-button v-show="formData.parts.length < 50" type="primary" @click="addPart()"
        >添加零件
      </el-button>
      <el-button v-show="formData.parts.length < 50" type="primary" @click="addFault()"
        >添加零件
      </el-button>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">提交报修</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup name="BpmOALeaveCreate" lang="ts">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import * as ReparationpartAPI from '@/api/insurance/reparationpart'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'

//import {createReparationPart, ReparationPartVO} from "@/api/insurance/reparationpart";
const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const { currentRoute } = useRouter() // 路由
const router = useRouter() // 路由
const { wsCache } = useCache()

const user = wsCache.get(CACHE_KEY.USER)
const userName = user.user.nickname ? user.user.nickname : 'Admin'
const userId = user.user.id
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  id: undefined,
  userId: userId,
  userDeptId: undefined,
  userNickname: userName,
  userMobile: user.user.mobile,
  endusageDeptId: undefined,
  endusageDeptName: undefined,
  endusageDeptManagerId: undefined,
  elevtrId: undefined,
  elevtrNumber: undefined,
  maintainDeptId: undefined,
  maintainDeptName: undefined,
  registrationId: undefined,
  processInstanceId: undefined,
  totalPrice: 0,
  parts: [
    {
      id: undefined,
      partName: undefined,
      partUnitId: 1,
      partUnitPirce: 0,
      partQuantity: 1,
      partTotal: 0
    }
  ],
  faults: [
    {
      id: undefined,
      reparationId: 0,
      communityPic: undefined,
      unitPic: undefined,
      elevtrPic: undefined,
      faultPic: undefined,
      faultPic2: undefined,
      faultPic3: undefined,
      faultPic4: undefined,
      processInstanceId: undefined
    }
  ]
})
const formRules = reactive({
  userId: [{ required: true, message: '申请人的用户编号不能为空', trigger: 'blur' }],
  userDeptId: [{ required: true, message: '提交人所在单位不能为空', trigger: 'blur' }],
  userNickname: [{ required: true, message: '报险人姓名不能为空', trigger: 'blur' }],
  endusageDeptId: [{ required: true, message: '使用单位编号不能为空', trigger: 'blur' }],
  elevtrId: [{ required: true, message: '电梯id不能为空', trigger: 'blur' }],
  maintainDeptId: [{ required: true, message: '维保单位编号不能为空', trigger: 'blur' }],
  partName: [{ required: true, message: '零件名称不能为空', trigger: 'blur' }]
})
const formRef = ref() // 表单 Ref

/** 提交表单 */
const submitForm = async () => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
    const reparationpartId = await ReparationpartAPI.createReparationPart(data)
    message.success('发起成功')
    // 关闭当前 Tab
    delView(unref(currentRoute))
    router.push({
      name: 'ReparationpartDetail',
      query: {
        id: reparationpartId
      }
    })
  } finally {
    formLoading.value = false
  }
}
const addPart = () => {
  const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
  data.parts.push({
    partName: '',
    partUnitId: 1,
    partUnitPirce: 1,
    partQuantity: 0,
    partTotal: 0,
    id: 0,
    reparationId: 0,
    processInstanceId: ''
  })
}
const removeFault = (index) => {
  const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
  data.faults.splice(index, 1)
}
const addFault = () => {
  const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
  data.faults.push({
    id: 0,
    reparationId: 0,
    communityPic: '',
    unitPic: '',
    elevtrPic: '',
    faultPic: '',
    faultPic2: '',
    faultPic3: '',
    faultPic4: '',
    processInstanceId: ''
  })
}
const removePart = (index) => {
  const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
  data.parts.splice(index, 1)
  updateTotalPrice()
}
const updateTotalPrice = () => {
  const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
  let totalPrice = 0
  for (const part of data.parts) {
    part.partTotal = part.partUnitPirce * part.partQuantity
    totalPrice += part.partTotal
  }
  data.totalPrice = totalPrice
}

/**
 * 将传进来的值赋值给formData
 */
watch(
  () => formData.value.parts,
  (data) => {
    if (!data) return
    updateTotalPrice()
  },
  {
    deep: true,
    immediate: true
  }
)
/** 初始化 **/
onMounted(() => {
  getInfo()
})

/** 获得数据 */
const getInfo = async () => {}
</script>
