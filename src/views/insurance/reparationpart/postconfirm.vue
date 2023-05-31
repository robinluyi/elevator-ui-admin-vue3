<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="formRules"
    label-width="180px"
    v-loading="formLoading"
  >
    <el-card class="mb-20">
      <!-- <el-form-item label="申请人的用户编号" prop="userId">
        <el-input-number
          v-model="formData.userId"
          placeholder="请输入申请人的用户编号"
          disabled
          :controls="false"
        />
      </el-form-item> -->
      <el-form-item label="报险人姓名" prop="userNickname">
        <el-input v-model="formData.userNickname" placeholder="请输入报险人姓名" disabled />
      </el-form-item>
      <el-form-item label="报险人手机号码" prop="userMobile">
        <el-input v-model="formData.userMobile" placeholder="请输入报险人手机号码" maxlength="11" />
      </el-form-item>
      <el-form-item label="报险人所在单位" prop="userDeptName">
        <el-input v-model="formData.userDeptName" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="使用单位" prop="endusageDeptId">
        <el-select
          v-model="formData.endusageDeptId"
          placeholder="请选择使用单位"
          @change="onEndUsageChanged"
        >
          <el-option
            v-for="endusage in endusageDeptList"
            :key="endusage.id"
            :label="endusage.name"
            :value="endusage.id"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="使用单位" prop="endusageDeptName">
        <el-input v-model="formData.endusageDeptName" placeholder="请输入使用单位" />
      </el-form-item> -->
      <el-form-item label="使用单位负责人" prop="endusageDeptManagerName">
        <el-input
          v-model="formData.endusageDeptManagerName"
          placeholder="请输入使用单位负责人"
          disabled
        />
      </el-form-item>
      <el-form-item label="使用单位负责人手机号码" prop="endusageDeptManagerPhone">
        <el-input
          v-model="formData.endusageDeptManagerPhone"
          placeholder="请输入使用单位负责人手机号码"
        />
      </el-form-item>
      <el-form-item label="电梯id" prop="elevtrId">
        <el-input v-model="formData.elevtrId" placeholder="请输入电梯id" />
      </el-form-item>
      <el-form-item label="梯号" prop="elevtrNumber">
        <el-input v-model="formData.elevtrNumber" placeholder="请输入梯号" />
      </el-form-item>
      <el-form-item label="维保单位" prop="maintainDeptId">
        <el-select
          v-model="formData.maintainDeptId"
          placeholder="请选择维保单位"
          @change="onMaintainDeptChanged"
        >
          <el-option
            v-for="maintain in maintainDeptList"
            :key="maintain.id"
            :label="maintain.name"
            :value="maintain.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="注册代码" prop="registrationId">
        <el-input v-model="formData.registrationId" placeholder="请输入注册代码" />
      </el-form-item>
      <el-form-item label="配件总价格" prop="totalPrice">
        <el-input v-model="formData.totalPrice" placeholder="" disabled />
      </el-form-item>
    </el-card>

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
      <el-button @click="editForm('update')" type="primary" :disabled="formLoading">保存</el-button>
      <el-button @click="editForm('submit')" type="primary" :disabled="formLoading"
        >维修完成</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script setup name="BpmOALeaveCreate" lang="ts">
import * as ReparationpartAPI from '@/api/insurance/reparationpart'
import { useTagsViewStore } from '@/store/modules/tagsView'
import { CACHE_KEY, useCache } from '@/hooks/web/useCache'
import { propTypes } from '@/utils/propTypes'
import * as DeptApi from '@/api/system/dept'

//import {createReparationPart, ReparationPartVO} from "@/api/insurance/reparationpart";
const message = useMessage() // 消息弹窗
const { delView } = useTagsViewStore() // 视图操作
const { currentRoute } = useRouter() // 路由
const router = useRouter() // 路由
const { wsCache } = useCache()

const { query } = useRoute() // 查询参数

const props = defineProps({
  id: propTypes.number.def(undefined)
})
const detailLoading = ref(false) // 表单的加载中
const queryId = query.id as unknown as number // 从 URL 传递过来的 id 编号

const user = wsCache.get(CACHE_KEY.USER)
const userName = user.user.nickname ? user.user.nickname : 'Admin'
const userId = user.user.id
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formData = ref({
  id: undefined,
  userId: userId,
  userDeptId: undefined,
  userDeptName: undefined,
  userNickname: userName,
  userMobile: user.user.mobile,
  endusageDeptId: undefined,
  endusageDeptName: undefined,
  endusageDeptManagerId: undefined,
  endusageDeptManagerName: undefined,
  endusageDeptManagerPhone: undefined,
  elevtrId: undefined,
  elevtrNumber: undefined,
  maintainDeptId: undefined,
  maintainDeptName: undefined,
  registrationId: undefined,
  processInstanceId: undefined,
  totalPrice: 0,
  marks: '',
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
const maintainDeptList = ref<any[]>([]) // 维保公司列表
const endusageDeptList = ref<any[]>([]) // 电梯使用单位列表
/** 提交表单 */
const editForm = async (action) => {
  // 校验表单
  if (!formRef) return
  const valid = await formRef.value.validate()
  if (!valid) return
  // 提交请求
  formLoading.value = true
  try {
    let reparationpartId
    const data = formData.value as unknown as ReparationpartAPI.ReparationPartVO
    if ('update' === action) {
      reparationpartId = await ReparationpartAPI.updateReparationPart(data)
    } else if ('submit' === action) {
      reparationpartId = await ReparationpartAPI.submitUpdatedReparationPart(data)
    }
    message.success('修改成功')
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

/** 获得数据 */
const getInfo = async () => {
  detailLoading.value = true
  try {
    formData.value = await ReparationpartAPI.getReparationPart(props.id || queryId)
    const editable = formData.value.marks
    if (editable.indexOf('form_editable') < 0) {
      router.push({
        name: 'ReparationpartDetail',
        query: {
          id: formData.value.id
        }
      })
    }
    // 加载用户列表
    maintainDeptList.value = await DeptApi.getMaintainDeptList()
    endusageDeptList.value = await DeptApi.getEndusageDeptList()
  } finally {
    detailLoading.value = false
  }
}
defineExpose({ open: getInfo }) // 提供 open 方法，用于打开弹窗
const onMaintainDeptChanged = (id?: number) => {
  const found = maintainDeptList.value.find((v) => v.id === id)
  if (found) {
    formData.value.maintainDeptName = found.name
  }
}

/** 初始化 **/
onMounted(() => {
  getInfo()
})
</script>
