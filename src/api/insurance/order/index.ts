import request from '@/config/axios'

export interface OrderVO {
  id: number
  orderId: string
  insrType: string
  projectName: string
  provincial: string
  city: string
  district: string
  street: string
  insuredUsername: string
  insrStartTime: Date
  insrEndTime: Date
  total: number
  totalStraight: number
  totalEscalator: number
  organizationName: string
  comments: string
  hasPart: byte
}

// 查询保单列表
export const getOrderPage = async (params) => {
  return await request.get({ url: `/insurance/order/page`, params })
}

// 查询保单详情
export const getOrder = async (id: number) => {
  return await request.get({ url: `/insurance/order/get?id=` + id })
}

// 新增保单
export const createOrder = async (data: OrderVO) => {
  return await request.post({ url: `/insurance/order/create`, data })
}

// 修改保单
export const updateOrder = async (data: OrderVO) => {
  return await request.put({ url: `/insurance/order/update`, data })
}

// 删除保单
export const deleteOrder = async (id: number) => {
  return await request.delete({ url: `/insurance/order/delete?id=` + id })
}

// 导出保单 Excel
export const exportOrder = async (params) => {
  return await request.download({ url: `/insurance/order/export-excel`, params })
}
