<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-width="80px"
    v-loading="formLoading"
  >
    <el-form-item label="请假类型" prop="type">
      <el-select v-model="formData.type" placeholder="请选择请假类型" clearable>
        <el-option
          v-for="dict in getIntDictOptions(DICT_TYPE.BPM_OA_LEAVE_TYPE)"
          :key="dict.value"
          :label="dict.label"
          :value="dict.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="开始时间" prop="startTime">
      <el-date-picker
        clearable
        v-model="formData.startTime"
        type="datetime"
        value-format="x"
        placeholder="请选择开始时间"
      />
    </el-form-item>
    <el-form-item label="结束时间" prop="endTime">
      <el-date-picker
        clearable
        v-model="formData.endTime"
        type="datetime"
        value-format="x"
        placeholder="请选择结束时间"
      />
    </el-form-item>
    <el-form-item label="原因" prop="reason">
      <el-input v-model="formData.reason" type="textarea" placeholder="请输请假原因" />
    </el-form-item>

    <div v-for="(part, index) in formData.parts" :key="'part' + index">
      <el-card class="mb-20">
        <Icon icon="ep:plus" class="mr-5px" /> Part {{ index + 1 }}
        <div class="part-fields">
          <el-form-item label="Part name" prop="name">
            <el-input v-model="part.name" placeholder="Enter part name" />
          </el-form-item>
          <el-form-item label="Unit" prop="unit">
            <el-input v-model="part.unit" placeholder="Enter unit" />
          </el-form-item>
          <el-form-item label="Quantity" prop="quantity">
            <el-input-number v-model="part.quantity" :precision="0" :min="1" />
          </el-form-item>
          <el-form-item label="Unit price" prop="price">
            <el-input-number v-model="part.price" :min="0" :step="0.01" :controls="false" />
          </el-form-item>
        </div>
        <div class="part-actions">
          <el-button
            type="danger"
            size="small"
            :disabled="formData.parts.length === 1"
            @click="removePart(index)"
            >Remove</el-button
          >
        </div>
      </el-card>
    </div>
    <el-button
      v-show="formData.parts.length < 5"
      type="primary"
      icon="el-icon-plus"
      @click="addPart()"
      >Add part</el-button
    >
    <el-form-item label="Total price" prop="totalPrice">
      <el-input-number
        v-model="formData.totalPrice"
        :min="0"
        :step="0.01"
        :precision="2"
        :controls="false"
        disabled
      />
    </el-form-item>

    <el-form-item>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup name="BpmOALeaveCreate" lang="ts">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import * as LeaveApi from '@/api/bpm/leave'
import { useTagsViewStore } from '@/store/modules/tagsView'
const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const { currentRoute } = useRouter() // 路由

const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  type: undefined,
  reason: undefined,
  startTime: undefined,
  endTime: undefined,
  totalPrice: undefined,
  parts: [
    {
      name: undefined,
      unit: undefined,
      quantity: undefined,
      price: undefined
    }
  ]
})
const formRules = reactive({
  type: [{ required: true, message: '请假类型不能为空', trigger: 'blur' }],
  reason: [{ required: true, message: '请假原因不能为空', trigger: 'change' }],
  startTime: [{ required: true, message: '请假开始时间不能为空', trigger: 'change' }],
  endTime: [{ required: true, message: '请假结束时间不能为空', trigger: 'change' }]
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
    const data = formData.value as unknown as LeaveApi.LeaveVO
    await LeaveApi.createLeave(data)
    message.success('发起成功')
    // 关闭当前 Tab
    delView(unref(currentRoute))
  } finally {
    formLoading.value = false
  }
}
const addPart = () => {
  const data = formData.value as unknown as LeaveApi.LeaveVO
  data.parts.push({
    name: '',
    unit: '',
    quantity: 1,
    price: 0
  })
}
const removePart = (index) => {
  const data = formData.value as unknown as LeaveApi.LeaveVO
  data.parts.splice(index, 1)
  updateTotalPrice()
}
const updateTotalPrice = () => {
  const data = formData.value as unknown as LeaveApi.LeaveVO
  let totalPrice = 0
  for (const part of data.parts) {
    totalPrice += part.quantity * part.price
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
</script>
