import type { CrudSchema } from '@/hooks/web/useCrudSchemas'
import { dateFormatter } from '@/utils/formatTime'

// 表单校验
export const rules = reactive({
  reparationId: [required],
  partName: [required],
  partUnitId: [required],
  partUnitPirce: [required],
  partQuantity: [required],
  partTotal: [required]
})

// CrudSchema https://doc.iocoder.cn/vue3/crud-schema/
const crudSchemas = reactive<CrudSchema[]>([
  {
    label: '报修零件主键',
    field: 'id',
    isForm: false
  },
  {
    label: '报修单号',
    field: 'reparationId',
    isSearch: true
  },
  {
    label: '配件名称',
    field: 'partName',
    isSearch: true
  },
  {
    label: '单位',
    field: 'partUnitId',
    dictType: DICT_TYPE.ELEVTR_PART_UNIT,
    dictClass: 'number',
    isSearch: true
  },
  {
    label: '单价',
    field: 'partUnitPirce',
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '数量',
    field: 'partQuantity',
    form: {
      component: 'InputNumber',
      value: 0
    }
  },
  {
    label: '小计',
    field: 'partTotal'
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
