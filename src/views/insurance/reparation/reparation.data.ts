import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'

// 表单校验
export const rules = reactive({
  userId: [required],
  userDeptId: [required],
  userNickname: [required],
  endusageDeptId: [required],
  elevtrId: [required],
  maintainDeptId: [required]
})

// CrudSchema https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: '维修表单主键',
    field: 'id',
    isForm: false
  },
  {
    label: '申请人的用户编号',
    field: 'userId',
    isSearch: false,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '提交人所在单位',
    field: 'userDeptId',
    isSearch: false,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '报险人姓名',
    field: 'userNickname',
    isSearch: true
  },
  {
    label: '报险人手机号码',
    field: 'userMobile',
    isSearch: true
  },
  {
    label: '使用单位编号',
    field: 'endusageDeptId',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '使用单位',
    field: 'endusageDeptName',
    isSearch: true
  },
  {
    label: '使用单位负责人',
    field: 'endusageDeptManagerId',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '电梯id',
    field: 'elevtrId',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '梯号',
    field: 'elevtrNumber',
    isSearch: true
  },
  {
    label: '维保单位编号',
    field: 'maintainDeptId',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '维保单位',
    field: 'maintainDeptName',
    isSearch: true
  },
  {
    label: '注册代码',
    field: 'registrationId',
    isSearch: true
  },
  {
    label: '流程实例的编号',
    field: 'processInstanceId',
    isSearch: false
  },
  {
    label: '创建时间',
    field: 'createTime',
    formatter: dateFormatter,
    isSearch: true,
    search: {
      component: 'DatePicker',
      componentProps: {
        valueFormat: 'YYYY-MM-DD HH:mm:ss',
        type: 'daterange',
        defaultTime: [new Date('1 00:00:00'), new Date('1 23:59:59')]
      }
    },
    isForm: false
  },
  {
    label: '配件总价格',
    field: 'totalPrice',
    isSearch: true,
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '操作',
    field: 'action',
    isForm: false
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
