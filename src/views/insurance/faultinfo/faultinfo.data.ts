import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'

// 表单校验
export const rules = reactive({
  reparationId: [required]
})

// CrudSchema https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: '故障信息主键',
    field: 'id',
    isForm: false
  },
  {
    label: '报修单号',
    field: 'reparationId',
    isSearch: true
  },
  {
    label: '小区照片',
    field: 'communityPic',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '单元照片',
    field: 'unitPic',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '电梯照片',
    field: 'elevtrPic',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '故障现场照片',
    field: 'faultPic',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '故障现场照片2',
    field: 'faultPic2',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '故障现场照片3',
    field: 'faultPic3',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '故障现场照片4',
    field: 'faultPic4',
    isTable: false,
    form: {
      component: 'UploadImg'
    }
  },
  {
    label: '流程实例的编号',
    field: 'processInstanceId',
    isTable: false
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
    label: '操作',
    field: 'action',
    isForm: false
  }
])
export const { allSchemas } = useCrudSchemas(crudSchemas)
