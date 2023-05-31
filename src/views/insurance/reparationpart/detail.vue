<template>
  <ContentWrap>
    <el-descriptions :column="1" border>
      <el-descriptions-item label="维修流水单号"> {{ detailData.id }} </el-descriptions-item>
      <!-- <el-descriptions-item label="申请人的用户编号">
        {{ detailData.userId }}
      </el-descriptions-item> -->
      <el-descriptions-item label="提交人所在单位">
        {{ detailData.userDeptName }}
      </el-descriptions-item>
      <el-descriptions-item label="报险人姓名">
        {{ detailData.userNickname }}
      </el-descriptions-item>
      <el-descriptions-item label="报险人手机号码">
        {{ detailData.userMobile }}
      </el-descriptions-item>
      <el-descriptions-item label="使用单位编号">
        {{ detailData.endusageDeptId }}
      </el-descriptions-item>
      <el-descriptions-item label="使用单位">
        {{ detailData.endusageDeptName }}
      </el-descriptions-item>
      <!-- <el-descriptions-item label="使用单位负责人编号">
        {{ detailData.endusageDeptManagerId }}
      </el-descriptions-item> -->
      <el-descriptions-item label="使用单位负责人姓名">
        {{ detailData.endusageDeptManagerName }}
      </el-descriptions-item>
      <el-descriptions-item label="使用单位负责人手机号码">
        {{ detailData.endusageDeptManagerPhone }}
      </el-descriptions-item>
      <el-descriptions-item label="梯号"> {{ detailData.elevtrNumber }} </el-descriptions-item>
      <el-descriptions-item label="维保单位编号">
        {{ detailData.maintainDeptId }}
      </el-descriptions-item>
      <el-descriptions-item label="维保单位">
        {{ detailData.maintainDeptName }}
      </el-descriptions-item>
      <el-descriptions-item label="注册代码">
        {{ detailData.registrationId }}
      </el-descriptions-item>
      <el-descriptions-item label="创建时间">
        {{ formatDate(detailData.createTime, 'YYYY-MM-DD') }}
      </el-descriptions-item>
      <el-descriptions-item label="当前状态">
        <dict-tag :type="DICT_TYPE.BPM_PROCESS_INSTANCE_RESULT" :value="detailData.result" />
      </el-descriptions-item>
      <el-descriptions-item label="配件总价格"> {{ detailData.totalPrice }} </el-descriptions-item>
    </el-descriptions>
  </ContentWrap>
  <div v-for="(part, index) in detailData.parts" :key="'part' + index">
    <ContentWrap>
      <div class="part-fields">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="零件名称"> {{ part.partName }} </el-descriptions-item>
          <el-descriptions-item label="数量 单位">
            {{ part.partQuantity }}
            <dict-tag :type="DICT_TYPE.ELEVTR_PART_UNIT" :value="part.partUnitId" />
          </el-descriptions-item>
          <!-- <el-descriptions-item label="单位">
           
          </el-descriptions-item> -->
          <el-descriptions-item label="单价"> {{ part.partUnitPirce }} 元 </el-descriptions-item>
          <el-descriptions-item label="小计"> {{ part.partTotal }} 元 </el-descriptions-item>
        </el-descriptions>
      </div>
    </ContentWrap>
  </div>
  <div v-for="(fault, index) in detailData.faults" :key="'part' + index">
    <ContentWrap>
      <div class="part-fields">
        <el-descriptions :column="1" border direction="horizontal">
          <el-descriptions-item label="小区照片">
            <el-image style="width: 200px; height: 200px" :src="fault.communityPic" fit="contain" />
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
</template>
<script lang="ts" name="BpmOALeaveDetail" setup>
import { DICT_TYPE } from '@/utils/dict'
import { formatDate } from '@/utils/formatTime'
import { propTypes } from '@/utils/propTypes'
import * as ReparationpartAPI from '@/api/insurance/reparationpart'
// import * as UserApi from '@/api/system/user'
// import * as DeptApi from '@/api/system/dept'

const { query } = useRoute() // 查询参数

const props = defineProps({
  id: propTypes.number.def(undefined)
})
const detailLoading = ref(false) // 表单的加载中
const detailData = ref<any>({}) // 详情数据
const queryId = query.id as unknown as number // 从 URL 传递过来的 id 编号

/** 获得数据 */
const getInfo = async () => {
  detailLoading.value = true
  try {
    detailData.value = await ReparationpartAPI.getReparationPart(props.id || queryId)
    // UserApi.getUser(detailData.value.endusageDeptManagerId).then((enduser) => {
    //   detailData.value.endusageDeptManagerName = enduser.nickname
    //   detailData.value.endusageDeptManagerPhone = enduser.mobile
    // })
    // DeptApi.getDept(detailData.value.userDeptId).then((dept) => {
    //   detailData.value.userDeptName = dept.name
    // })
  } finally {
    detailLoading.value = false
  }
}
defineExpose({ open: getInfo }) // 提供 open 方法，用于打开弹窗

/** 初始化 **/
onMounted(() => {
  getInfo()
})
</script>
