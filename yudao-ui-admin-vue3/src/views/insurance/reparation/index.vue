<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="申请人的用户编号" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入申请人的用户编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="提交人所在单位" prop="userDeptId">
        <el-input
          v-model="queryParams.userDeptId"
          placeholder="请输入提交人所在单位"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="报险人姓名" prop="userNickname">
        <el-input
          v-model="queryParams.userNickname"
          placeholder="请输入报险人姓名"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="报险人手机号码" prop="userMobile">
        <el-input
          v-model="queryParams.userMobile"
          placeholder="请输入报险人手机号码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="使用单位编号" prop="endusageDeptId">
        <el-input
          v-model="queryParams.endusageDeptId"
          placeholder="请输入使用单位编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="使用单位" prop="endusageDeptName">
        <el-input
          v-model="queryParams.endusageDeptName"
          placeholder="请输入使用单位"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="使用单位负责人" prop="endusageDeptManagerId">
        <el-input
          v-model="queryParams.endusageDeptManagerId"
          placeholder="请输入使用单位负责人"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="电梯id" prop="elevtrId">
        <el-input
          v-model="queryParams.elevtrId"
          placeholder="请输入电梯id"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="梯号" prop="elevtrNumber">
        <el-input
          v-model="queryParams.elevtrNumber"
          placeholder="请输入梯号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="维保单位编号" prop="maintainDeptId">
        <el-input
          v-model="queryParams.maintainDeptId"
          placeholder="请输入维保单位编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="维保单位" prop="maintainDeptName">
        <el-input
          v-model="queryParams.maintainDeptName"
          placeholder="请输入维保单位"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="注册代码" prop="registrationId">
        <el-input
          v-model="queryParams.registrationId"
          placeholder="请输入注册代码"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="配件总价格" prop="totalPrice">
        <el-input
          v-model="queryParams.totalPrice"
          placeholder="请输入配件总价格"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="配件名称" prop="partName">
        <el-input
          v-model="queryParams.partName"
          placeholder="请输入配件名称"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="单位" prop="partUnitId">
        <el-input
          v-model="queryParams.partUnitId"
          placeholder="请输入单位"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="单价" prop="partUnitPirce">
        <el-input
          v-model="queryParams.partUnitPirce"
          placeholder="请输入单价"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数量" prop="partQuantity">
        <el-input
          v-model="queryParams.partQuantity"
          placeholder="请输入数量"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="小计" prop="partTotal">
        <el-input
          v-model="queryParams.partTotal"
          placeholder="请输入小计"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="小区照片" prop="communityPic">
        <el-input
          v-model="queryParams.communityPic"
          placeholder="请输入小区照片"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="单元照片" prop="unitPic">
        <el-input
          v-model="queryParams.unitPic"
          placeholder="请输入单元照片"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="电梯照片" prop="elevtrPic">
        <el-input
          v-model="queryParams.elevtrPic"
          placeholder="请输入电梯照片"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="故障现场照片" prop="faultPic">
        <el-input
          v-model="queryParams.faultPic"
          placeholder="请输入故障现场照片"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="故障现场照片" prop="faultPic2">
        <el-input
          v-model="queryParams.faultPic2"
          placeholder="请输入故障现场照片"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="流程实例的编号" prop="processInstanceId">
        <el-input
          v-model="queryParams.processInstanceId"
          placeholder="请输入流程实例的编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['insurance:reparation:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['insurance:reparation:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="维修表单主键" align="center" prop="id" />
      <el-table-column label="申请人的用户编号" align="center" prop="userId" />
      <el-table-column label="提交人所在单位" align="center" prop="userDeptId" />
      <el-table-column label="报险人姓名" align="center" prop="userNickname" />
      <el-table-column label="报险人手机号码" align="center" prop="userMobile" />
      <el-table-column label="使用单位编号" align="center" prop="endusageDeptId" />
      <el-table-column label="使用单位" align="center" prop="endusageDeptName" />
      <el-table-column label="使用单位负责人" align="center" prop="endusageDeptManagerId" />
      <el-table-column label="电梯id" align="center" prop="elevtrId" />
      <el-table-column label="梯号" align="center" prop="elevtrNumber" />
      <el-table-column label="维保单位编号" align="center" prop="maintainDeptId" />
      <el-table-column label="维保单位" align="center" prop="maintainDeptName" />
      <el-table-column label="注册代码" align="center" prop="registrationId" />
      <el-table-column label="配件总价格" align="center" prop="totalPrice" />
      <el-table-column label="配件名称" align="center" prop="partName" />
      <el-table-column label="单位" align="center" prop="partUnitId" />
      <el-table-column label="单价" align="center" prop="partUnitPirce">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.ELEVTR_PART_UNIT" :value="scope.row.partUnitPirce" />
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" prop="partQuantity" />
      <el-table-column label="小计" align="center" prop="partTotal" />
      <el-table-column label="小区照片" align="center" prop="communityPic" />
      <el-table-column label="单元照片" align="center" prop="unitPic" />
      <el-table-column label="电梯照片" align="center" prop="elevtrPic" />
      <el-table-column label="故障现场照片" align="center" prop="faultPic" />
      <el-table-column label="故障现场照片" align="center" prop="faultPic2" />
      <el-table-column label="流程实例的编号" align="center" prop="processInstanceId" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['insurance:reparation:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['insurance:reparation:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <ReparationForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts" name="Reparation">
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import * as ReparationApi from '@/api/insurance/reparation'
import ReparationForm from './ReparationForm.vue'
const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  userId: null,
  userDeptId: null,
  userNickname: null,
  userMobile: null,
  endusageDeptId: null,
  endusageDeptName: null,
  endusageDeptManagerId: null,
  elevtrId: null,
  elevtrNumber: null,
  maintainDeptId: null,
  maintainDeptName: null,
  registrationId: null,
  totalPrice: null,
  partName: null,
  partUnitId: null,
  partUnitPirce: null,
  partQuantity: null,
  partTotal: null,
  communityPic: null,
  unitPic: null,
  elevtrPic: null,
  faultPic: null,
  faultPic2: null,
  processInstanceId: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ReparationApi.getReparationPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await ReparationApi.deleteReparation(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await ReparationApi.exportReparation(queryParams)
    download.excel(data, '电梯报修申请.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
