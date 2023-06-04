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
          v-hasPermi="['insurance:reparationpart:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list">
      <el-table-column label="维修表单号" align="center" prop="id" />
      <el-table-column label="报险人姓名" align="center" prop="userNickname" />
      <el-table-column label="报险人手机号码" align="center" prop="userMobile" />
      <el-table-column label="使用单位" align="center" prop="endusageDeptName" />
      <el-table-column label="使用单位负责人" align="center" prop="endusageDeptManagerId" />
      <el-table-column label="梯号" align="center" prop="elevtrNumber" />
      <el-table-column label="维保单位编号" align="center" prop="maintainDeptId" />
      <el-table-column label="维保单位" align="center" prop="maintainDeptName" />
      <el-table-column label="注册代码" align="center" prop="registrationId" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
      />
      <el-table-column label="配件总价格" align="center" prop="totalPrice" />
      <el-table-column label="状态" align="center" prop="result">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.BPM_PROCESS_INSTANCE_RESULT" :value="scope.row.result" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="handleDetail(scope.row.id)"
            v-hasPermi="['insurance:reparation:update']"
          >
            查看
          </el-button>
          <el-button
            link
            type="danger"
            @click="cancel(scope.row)"
            v-hasPermi="['insurance:reparation:update']"
            v-if="scope.row.result === 1"
          >
            取消
          </el-button>
          <el-button
            link
            type="danger"
            @click="update(scope.row.id)"
            v-hasPermi="['insurance:reparation:update']"
            v-if="scope.row.result === -1"
          >
            修改
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleProcess(scope.row.id)"
            v-hasPermi="['insurance:reparation:update']"
            v-if="scope.row.result === 201"
          >
            维修确认
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
</template>

<script setup lang="ts" name="Reparation">
import { DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import * as ReparationPartApi from '@/api/insurance/reparationpart'
import * as ProcessInstanceApi from '@/api/bpm/processInstance'

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化
const router = useRouter() // 路由

const loading = ref(true) // 列表的加载中
const total = ref(0) // 列表的总页数
const list = ref([]) // 列表的数据
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  userId: null,
  createTime: []
})
const queryFormRef = ref() // 搜索的表单

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await ReparationPartApi.getMyReparationPartPage(queryParams)
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
const handleDetail = (id) => {
  router.push({
    name: 'ReparationpartDetail',
    query: {
      id: id
    }
  })
}
const update = (id) => {
  router.push({
    name: 'ReparationpartEdit',
    query: {
      id: id
    }
  })
}
const handleProcess = (id) => {
  router.push({
    name: 'ReparationpartPostConfirm',
    query: {
      id: id
    }
  })
}
/** 取消请假操作 */
const cancel = async (row) => {
  // 二次确认
  const { value } = await ElMessageBox.prompt('请输入取消原因', '取消流程', {
    confirmButtonText: t('common.ok'),
    cancelButtonText: t('common.cancel'),
    inputPattern: /^[\s\S]*.*\S[\s\S]*$/, // 判断非空，且非空格
    inputErrorMessage: '取消原因不能为空'
  })
  // 发起取消
  await ProcessInstanceApi.cancelProcessInstance(row.id, value)
  message.success('取消成功')
  // 刷新列表
  await getList()
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>
