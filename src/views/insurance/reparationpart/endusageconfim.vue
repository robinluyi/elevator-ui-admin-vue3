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
        <el-input
          v-model="formData.userMobile"
          placeholder="请输入报险人手机号码"
          maxlength="11"
          disabled
        />
      </el-form-item>
      <el-form-item label="报险人所在单位" prop="userDeptName">
        <el-input v-model="formData.userDeptName" placeholder="" disabled />
      </el-form-item>
      <el-form-item label="使用单位" prop="endusageDeptId" disabled>
        <el-select
          v-model="formData.endusageDeptId"
          placeholder="请选择使用单位"
          @change="onEndUsageChanged"
          disabled
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
          disabled
        />
      </el-form-item>
      <el-form-item label="电梯id" prop="elevtrId">
        <el-input v-model="formData.elevtrId" placeholder="请输入电梯id" disabled />
      </el-form-item>
      <el-form-item label="梯号" prop="elevtrNumber">
        <el-input v-model="formData.elevtrNumber" placeholder="请输入梯号" disabled />
      </el-form-item>
      <el-form-item label="维保单位" prop="maintainDeptId" disabled>
        <el-select
          v-model="formData.maintainDeptId"
          placeholder="请选择维保单位"
          @change="onMaintainDeptChanged"
          disabled
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
        <el-input v-model="formData.registrationId" placeholder="请输入注册代码" disabled />
      </el-form-item>
      <el-form-item label="配件总价格" prop="totalPrice">
        <el-input v-model="formData.totalPrice" placeholder="" disabled />
      </el-form-item>
    </el-card>

    <div v-for="(fault, index) in formData.faults" :key="'part' + index">
      <ContentWrap>
        <div class="part-fields">
          <el-descriptions :column="1" border direction="horizontal">
            <el-descriptions-item label="小区照片">
              <el-image
                style="width: 200px; height: 200px"
                :src="fault.communityPic"
                fit="contain"
              />
            </el-descriptions-item>
            <el-descriptions-item label="单元照片">
              <el-image style="width: 200px; height: 200px" :src="fault.unitPic" fit="contain" />
            </el-descriptions-item>
            <el-descriptions-item label="电梯照片">
              <el-image style="width: 200px; height: 200px" :src="fault.elevtrPic" fit="contain" />
            </el-descriptions-item>
            <el-descriptions-item label="故障现场照片1">
              <el-image style="width: 200px; height: 200px" :src="fault.faultPic" fit="contain" />
            </el-descriptions-item>
            <el-descriptions-item label="故障现场照片1">
              <el-image style="width: 200px; height: 200px" :src="fault.faultPic2" fit="contain" />
            </el-descriptions-item>
            <el-descriptions-item label="故障现场照片1">
              <el-image style="width: 200px; height: 200px" :src="fault.faultPic3" fit="contain" />
            </el-descriptions-item>
            <el-descriptions-item label="故障现场照片1">
              <el-image style="width: 200px; height: 200px" :src="fault.faultPic4" fit="contain" />
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </ContentWrap>
    </div>
    <el-card class="mb-20">
      <!-- <Icon icon="ep:plus" class="mr-5px" /> fault {{ index + 1 }} -->
      <div class="userConfirmPic-fields">
        <el-form-item label="物业确认照片" :prop="endusageConfirmPic">
          <UploadImg v-model="formData.endusageConfirmPic" :limit="5" />
        </el-form-item>
      </div>
      <el-form-item label="留言" prop="reason">
        <el-input v-model="formData.reason" placeholder="物业已确认!" />
      </el-form-item>
    </el-card>

    <el-form-item>
      <el-button @click="editForm('update')" type="primary" :disabled="formLoading">保存</el-button>
      <el-button @click="editForm('submit')" type="primary" :disabled="formLoading"
        >物业确认</el-button
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
    // const editable = formData.value.marks
    // if (editable.indexOf('post_enduser_confirm_editable') < 0) {
    //   router.push({
    //     name: 'ReparationpartDetail',
    //     query: {
    //       id: formData.value.id
    //     }
    //   })
    // }
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
